import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, SRGBColorSpace } from "three";
import SceneCanvas from "./SceneCanvas";
import { useGame } from "../state/store";
function useFacade() {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#575f63";
    ctx.fillRect(0, 0, 256, 512);
    for (let y = 12; y < 512; y += 48)
      for (let x = 10; x < 256; x += 49) {
        ctx.fillStyle = (x + y) % 3 ? "#243b46" : "#b8a17d";
        ctx.fillRect(x, y, 33, 33);
        ctx.fillStyle = "#91a6aa";
        ctx.fillRect(x, y, 33, 2);
      }
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
function Building({
  position,
  width,
  height,
  depth,
  color,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  color: string;
}) {
  const map = useFacade();
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      <mesh position={[0, height / 2, depth / 2 + 0.012]}>
        <planeGeometry args={[width - 0.5, height - 0.6]} />
        <meshStandardMaterial map={map} roughness={0.42} metalness={0.2} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * (width / 2 - 0.15), height / 2, depth / 2 + 0.2]}
          castShadow
        >
          <boxGeometry args={[0.22, height, 0.4]} />
          <meshStandardMaterial color="#9a9b93" />
        </mesh>
      ))}
      <mesh position={[0, height + 0.12, 0]} castShadow>
        <boxGeometry args={[width + 0.35, 0.25, depth + 0.35]} />
        <meshStandardMaterial color="#777e7c" />
      </mesh>
    </group>
  );
}
function ShopSign() {
  const map = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 768;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#243632";
    ctx.fillRect(0, 0, 768, 128);
    ctx.fillStyle = "#eadfc5";
    ctx.font = "500 45px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("F O U N D E R   H O U S E", 384, 79);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <mesh position={[2, 3.1, -4.34]}>
      <planeGeometry args={[5.5, 0.85]} />
      <meshStandardMaterial map={map} roughness={0.8} />
    </mesh>
  );
}
function Tree({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.5, 0.6, 1.5]} />
        <meshStandardMaterial color="#7d8075" />
      </mesh>
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 3, 8]} />
        <meshStandardMaterial color="#574e3d" />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[1, 1.3, 1]} castShadow>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial color="#54705b" roughness={1} />
      </mesh>
    </group>
  );
}
function CameraLife() {
  const { camera, invalidate } = useThree();
  const reduced = useGame((s) => s.reducedMotion);
  const quality = useGame((s) => s.quality);
  useEffect(() => {
    camera.lookAt(1, 2, -5);
    invalidate();
    if (
      reduced ||
      quality === "low" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = setInterval(() => {
      if (!document.hidden) invalidate();
    }, 66);
    return () => clearInterval(timer);
  }, [camera, invalidate, reduced, quality]);
  useFrame(({ clock }) => {
    if (
      !reduced &&
      quality !== "low" &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      camera.position.x = 9 + Math.sin(clock.elapsedTime * 0.055) * 0.45;
      camera.lookAt(1, 2, -5);
    }
  });
  return null;
}
export default function UrbanWorld() {
  return (
    <SceneCanvas
      label="Rendered 3D courtyard outside Founder House at sunrise"
      position={[9, 4, 12]}
    >
      <color attach="background" args={["#9baeb3"]} />
      <fog attach="fog" args={["#a5b5b6", 24, 65]} />
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#cee0e5", "#a28b72", 1.4]} />
      <directionalLight
        position={[-12, 18, 5]}
        color="#ffdaa8"
        intensity={3.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-bias={-0.001}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#727b7c" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.09, -3]} receiveShadow>
        <boxGeometry args={[30, 0.18, 13]} />
        <meshStandardMaterial color="#b6b6a5" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.02, 6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[75, 7]} />
        <meshStandardMaterial color="#485258" roughness={0.85} />
      </mesh>
      {[-20, -12, -4, 4, 12, 20].map((x) => (
        <mesh key={x} position={[x, 0.025, 6]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 0.12]} />
          <meshStandardMaterial color="#d4cfb9" />
        </mesh>
      ))}
      <Building
        position={[2, 0, -7]}
        width={8}
        height={10}
        depth={5}
        color="#a2a79d"
      />
      <Building
        position={[-7, 0, -9]}
        width={6}
        height={16}
        depth={5}
        color="#7f8987"
      />
      <Building
        position={[11, 0, -11]}
        width={7}
        height={21}
        depth={7}
        color="#899795"
      />
      <Building
        position={[-17, 0, -14]}
        width={9}
        height={22}
        depth={7}
        color="#7a8c8b"
      />
      <Building
        position={[1, 0, -23]}
        width={10}
        height={26}
        depth={8}
        color="#8d9d9e"
      />
      <Building
        position={[22, 0, -18]}
        width={9}
        height={28}
        depth={8}
        color="#8d9693"
      />
      <mesh position={[2, 1.6, -4.35]}>
        <boxGeometry args={[5.5, 2.7, 0.15]} />
        <meshStandardMaterial color="#2e4a4e" metalness={0.3} roughness={0.2} />
      </mesh>
      {[-0.5, 2, 4.5].map((x) => (
        <mesh key={x} position={[x, 1.6, -4.21]}>
          <boxGeometry args={[0.07, 2.7, 0.15]} />
          <meshStandardMaterial color="#b5b4a2" />
        </mesh>
      ))}
      <ShopSign />
      <mesh position={[2, 3.75, -3.5]} castShadow>
        <boxGeometry args={[7, 0.16, 2]} />
        <meshStandardMaterial color="#4e675c" />
      </mesh>
      <Tree x={-4} z={-0.5} />
      <Tree x={8} z={-0.5} />
      <Tree x={-14} z={-2} />
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 5, 0.2, 1.2]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[2.5, 0.16, 0.75]} />
            <meshStandardMaterial color="#775e46" />
          </mesh>
          {[-0.95, 0.95].map((x) => (
            <mesh key={x} position={[x, 0.2, 0]}>
              <boxGeometry args={[0.12, 0.45, 0.6]} />
              <meshStandardMaterial color="#374740" />
            </mesh>
          ))}
        </group>
      ))}
      <group position={[10, 0.65, 6.5]}>
        <mesh castShadow>
          <boxGeometry args={[3.7, 0.7, 1.65]} />
          <meshStandardMaterial
            color="#294a4c"
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
        <mesh position={[-0.2, 0.6, 0]} castShadow>
          <boxGeometry args={[2, 0.65, 1.45]} />
          <meshStandardMaterial
            color="#668286"
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>
        {[-1.2, 1.2].flatMap((x) =>
          [-0.8, 0.8].map((z) => (
            <mesh
              key={`${x}-${z}`}
              position={[x, -0.3, z]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.35, 0.35, 0.17, 16]} />
              <meshStandardMaterial color="#222d30" />
            </mesh>
          )),
        )}
      </group>
      <CameraLife />
    </SceneCanvas>
  );
}
