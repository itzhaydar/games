import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, Component, type ReactNode } from "react";
import { useGame } from "../state/store";
function ContextGuard({ onLost }: { onLost: () => void }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onLost]);
  return null;
}
function Room({ onDesk }: { onDesk: () => void }) {
  return (
    <>
      <color attach="background" args={["#8b9b9e"]} />
      <fog attach="fog" args={["#8b9b9e", 18, 45]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[-4, 8, 4]} intensity={3} color="#ffe0b0" />
      <hemisphereLight args={["#b8d8ef", "#5b4b3a", 1]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[16, 14]} />
        <meshStandardMaterial color="#a99b83" />
      </mesh>
      <mesh position={[0, 2, -4]}>
        <boxGeometry args={[13, 4, 0.15]} />
        <meshStandardMaterial color="#d7d1c1" />
      </mesh>
      {[-4.2, -1.4, 1.4, 4.2].map((x) => (
        <group key={x}>
          <mesh position={[x, 2.35, -3.88]}>
            <boxGeometry args={[2.55, 2.7, 0.08]} />
            <meshStandardMaterial
              color="#789aaa"
              roughness={0.25}
              metalness={0.25}
            />
          </mesh>
          <mesh position={[x, 2.35, -3.8]}>
            <boxGeometry args={[0.06, 2.7, 0.08]} />
            <meshStandardMaterial color="#31474e" />
          </mesh>
        </group>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[-12 + i * 2.1, 0.5 + (i % 4) * 0.4, -9]}>
          <boxGeometry args={[1.6, 2 + (i % 4), 2]} />
          <meshStandardMaterial color={i % 2 ? "#687e86" : "#718b90"} />
        </mesh>
      ))}
      <group position={[0, 0, 0]}>
        <mesh
          position={[0, 1.25, 0]}
          onClick={onDesk}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <boxGeometry args={[3.4, 0.14, 1.5]} />
          <meshStandardMaterial color="#684b35" />
        </mesh>
        {[-1.4, 1.4].flatMap((x) =>
          [-0.5, 0.5].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.6, z]}>
              <boxGeometry args={[0.09, 1.2, 0.09]} />
              <meshStandardMaterial color="#263639" />
            </mesh>
          )),
        )}
        <mesh position={[0, 1.39, 0]}>
          <boxGeometry args={[0.85, 0.08, 0.6]} />
          <meshStandardMaterial color="#323f43" />
        </mesh>
        <mesh position={[0, 1.72, -0.28]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.85, 0.62, 0.05]} />
          <meshStandardMaterial color="#26363b" />
        </mesh>
        <mesh position={[0, 1.72, -0.24]} rotation={[-0.15, 0, 0]}>
          <planeGeometry args={[0.75, 0.5]} />
          <meshStandardMaterial
            color="#9eccc4"
            emissive="#436b66"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh position={[0.95, 1.4, 0.1]}>
          <cylinderGeometry args={[0.12, 0.1, 0.24, 16]} />
          <meshStandardMaterial color="#e6decc" />
        </mesh>
        <mesh position={[-0.9, 1.37, 0.1]}>
          <boxGeometry args={[0.4, 0.06, 0.55]} />
          <meshStandardMaterial color="#c5b083" />
        </mesh>
      </group>
      <group position={[3.8, 0, -2]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.35, 0.25, 0.6, 20]} />
          <meshStandardMaterial color="#b57d59" />
        </mesh>
        {[-0.25, 0, 0.25].map((x, i) => (
          <mesh key={i} position={[x, 1.05 + i * 0.2, 0]} rotation={[0, 0, x]}>
            <sphereGeometry args={[0.36, 12, 12]} />
            <meshStandardMaterial color="#496a53" />
          </mesh>
        ))}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 1, 8]} />
          <meshStandardMaterial color="#55432c" />
        </mesh>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, 0.6]}>
        <planeGeometry args={[5.8, 4.5]} />
        <meshStandardMaterial color="#697979" />
      </mesh>
      {[-0.42, 0.42].flatMap((x) =>
        [1.3, 1.95].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.28, z]}>
            <boxGeometry args={[0.07, 0.56, 0.07]} />
            <meshStandardMaterial color="#263639" />
          </mesh>
        )),
      )}
      <mesh position={[0, 0.6, 1.6]}>
        <boxGeometry args={[1.05, 0.16, 0.9]} />
        <meshStandardMaterial color="#34494b" />
      </mesh>
      <mesh position={[0, 1.12, 2]}>
        <boxGeometry args={[1.05, 0.95, 0.12]} />
        <meshStandardMaterial color="#34494b" />
      </mesh>
      <OrbitControls
        makeDefault
        target={[0, 1, -0.5]}
        minDistance={4}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0.45}
        enablePan={false}
      />
    </>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function Studio({ onDesk }: { onDesk: () => void }) {
  const quality = useGame((s) => s.quality);
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    setSupported(!!gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return () => {
      document.body.style.cursor = "";
    };
  }, []);
  const fallback = (
    <div className="scene-fallback">
      <span className="eyebrow">YOUR FIRST WORKSPACE</span>
      <h2>
        A small desk.
        <br />A world of possibility.
      </h2>
      <p>
        3D is unavailable on this device. Your journey and desk interaction are
        still available below.
      </p>
    </div>
  );
  if (supported === null)
    return <div className="scene-fallback">Preparing your workspace…</div>;
  return (
    <SceneBoundary fallback={fallback}>
      {supported ? (
        <Canvas
          key={quality}
          dpr={
            quality === "low" ? 1 : quality === "high" ? [1, 1.75] : [1, 1.25]
          }
          camera={{ position: [6, 4.5, 7], fov: 43 }}
          gl={{ antialias: quality !== "low", powerPreference: "low-power" }}
          frameloop="demand"
          onCreated={({ gl }) => {
            gl.domElement.setAttribute(
              "aria-label",
              "Interactive 3D founder studio. Drag to orbit; scroll to zoom. Use the Open desk button for keyboard access.",
            );
          }}
        >
          <ContextGuard onLost={() => setSupported(false)} />
          <Room onDesk={onDesk} />
        </Canvas>
      ) : (
        fallback
      )}
    </SceneBoundary>
  );
}
