import { budgetDpr } from "./quality";
import { SceneBoundary } from "../components/SceneBoundary";
import { useEffect, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGame } from "../state/store";
function ContextGuard({ onLost }: { onLost: () => void }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const lost = (e: Event) => {
      e.preventDefault();
      onLost();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onLost]);
  return null;
}
export default function SceneCanvas({
  children,
  label,
  position = [9, 4, 12],
  fallback,
  onAvailability,
}: {
  children: ReactNode;
  label: string;
  position?: [number, number, number];
  fallback?: ReactNode;
  onAvailability?: (ready: boolean) => void;
}) {
  const quality = useGame((s) => s.quality);
  const [dpr, setDpr] = useState(() =>
    budgetDpr(
      quality,
      window.innerWidth,
      window.innerHeight,
      window.devicePixelRatio,
    ),
  );
  useEffect(() => {
    const update = () =>
      setDpr(
        budgetDpr(
          quality,
          window.innerWidth,
          window.innerHeight,
          window.devicePixelRatio,
        ),
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [quality]);
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    setSupported(!!gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }, []);
  useEffect(() => {
    if (supported !== null) onAvailability?.(supported);
  }, [supported, onAvailability]);
  const alternative = fallback ?? (
    <div className="scene-fallback">
      <strong>3D is unavailable on this device.</strong>
      <p>
        Onboarding and the accessible workstation controls remain available.
      </p>
    </div>
  );
  if (supported === null)
    return (
      <div className="scene-loading" role="status">
        Preparing the world…
      </div>
    );
  if (!supported) return alternative;
  return (
    <SceneBoundary
      fallback={alternative}
      onError={() => onAvailability?.(false)}
    >
      <Canvas
        key={quality}
        shadows={quality !== "low"}
        dpr={dpr}
        frameloop="demand"
        camera={{ position, fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: quality !== "low", powerPreference: "low-power" }}
        onCreated={({ gl }) => gl.domElement.setAttribute("aria-label", label)}
      >
        <ContextGuard onLost={() => setSupported(false)} />
        {children}
      </Canvas>
    </SceneBoundary>
  );
}
