import { useEffect, useRef, useState, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Vector3, MathUtils } from "three";
import SceneCanvas from "./SceneCanvas";
import WorkstationRoom from "./WorkstationRoom";
import Founder from "./FounderPose";
import { useGame } from "../state/store";
import type { WorkState } from "../workstation/machine";
import { screenMatrix } from "../workstation/projection";
function SceneRig({
  mode,
  overlay,
  enlarged,
  onInputReady,
}: {
  mode: WorkState;
  overlay: RefObject<HTMLDivElement | null>;
  enlarged: boolean;
  onInputReady: (ready: boolean) => void;
}) {
  const { camera, size, invalidate } = useThree();
  const gender = useGame((s) => s.gender)!;
  const reduced = useGame((s) => s.reducedMotion);
  const actor = useRef<Group>(null);
  const [seated, setSeated] = useState(0);
  const seat = useRef(0);
  const targetLook = useRef(new Vector3(0, 1.3, 0));
  const started = useRef(false);
  const reported = useRef(false);
  useEffect(() => {
    reported.current = false;
  }, [mode]);
  useEffect(() => {
    invalidate();
  }, [mode, enlarged, invalidate, size]);
  useFrame((_, delta) => {
    const snap =
      reduced || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const amount = snap ? 1 : 1 - Math.exp(-Math.min(delta, 0.1) * 5);
    const atDesk = mode !== "exploring" && mode !== "exiting";
    const sitting = ["sitting", "viewing", "working"].includes(mode);
    const actorTarget = new Vector3(atDesk ? 0 : -2.2, 0, atDesk ? 1.5 : 3.7);
    const camTarget =
      mode === "working"
        ? new Vector3(0, 1.95, 2.7)
        : mode === "viewing" || mode === "sitting"
          ? new Vector3(3.6, 2.9, 4.8)
          : new Vector3(6.3, 3.7, 7.5);
    const lookTarget =
      mode === "working" ? new Vector3(0, 1.95, -0.7) : new Vector3(0, 1.1, 0);
    if (!started.current) {
      actor.current?.position.copy(actorTarget);
      camera.position.set(6.3, 3.7, 7.5);
      started.current = true;
    }
    camera.position.lerp(camTarget, amount);
    targetLook.current.lerp(lookTarget, amount);
    camera.lookAt(targetLook.current);
    camera.updateMatrixWorld();
    actor.current?.position.lerp(actorTarget, amount);
    seat.current = MathUtils.lerp(seat.current, sitting ? 1 : 0, amount);
    if (Math.abs(seat.current - seated) > 0.007) setSeated(seat.current);
    if (
      camera.position.distanceTo(camTarget) > 0.002 ||
      targetLook.current.distanceTo(lookTarget) > 0.002 ||
      (actor.current?.position.distanceTo(actorTarget) ?? 0) > 0.002 ||
      Math.abs(seat.current - (sitting ? 1 : 0)) > 0.007
    )
      invalidate();
    if (overlay.current && !enlarged) {
      const points = [
        [-1.6, 2.85, -0.645],
        [1.6, 2.85, -0.645],
        [1.6, 1.05, -0.645],
        [-1.6, 1.05, -0.645],
      ].map((p) => {
        const v = new Vector3(...p).project(camera);
        return {
          x: ((v.x + 1) * size.width) / 2,
          y: ((1 - v.y) * size.height) / 2,
        };
      });
      const matrix = screenMatrix(points, 1280, 720);
      if (matrix)
        overlay.current.style.transform = `matrix3d(${matrix.join(",")})`;
    }
    if (
      mode === "working" &&
      !reported.current &&
      camera.position.distanceTo(camTarget) < 0.002 &&
      targetLook.current.distanceTo(lookTarget) < 0.002
    ) {
      reported.current = true;
      onInputReady(true);
    }
  });
  return (
    <group ref={actor}>
      <Founder gender={gender} pose={{ seated, position: [0, 0, 0] }} />
    </group>
  );
}
export default function Studio({
  mode,
  onDesk,
  overlay,
  enlarged,
  onAvailability,
  onInputReady,
}: {
  mode: WorkState;
  onDesk: () => void;
  overlay: RefObject<HTMLDivElement | null>;
  enlarged: boolean;
  onAvailability: (ready: boolean) => void;
  onInputReady: (ready: boolean) => void;
}) {
  return (
    <SceneCanvas
      label="3D founder studio with temporary articulated character and interactive computer"
      position={[6.3, 3.7, 7.5]}
      onAvailability={onAvailability}
    >
      <WorkstationRoom onDesk={onDesk}>
        <SceneRig
          mode={mode}
          overlay={overlay}
          enlarged={enlarged}
          onInputReady={onInputReady}
        />
      </WorkstationRoom>
    </SceneCanvas>
  );
}
