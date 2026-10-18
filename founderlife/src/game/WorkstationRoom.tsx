import type { ReactNode } from "react";
export default function WorkstationRoom({
  onDesk,
  children,
}: {
  onDesk: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <color attach="background" args={["#90a5aa"]} />
      <fog attach="fog" args={["#90a5aa", 20, 50]} />
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#d9e5e8", "#a18a70", 1.4]} />
      <directionalLight
        position={[-5, 10, 4]}
        intensity={3}
        color="#ffdfb2"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[14, 0.15, 14]} />
        <meshStandardMaterial color="#a5987f" roughness={0.95} />
      </mesh>
      <mesh position={[-5, 2, 0]} receiveShadow>
        <boxGeometry args={[0.15, 4, 10]} />
        <meshStandardMaterial color="#bfccbf" />
      </mesh>
      <mesh position={[0, 0.5, -4]} receiveShadow>
        <boxGeometry args={[10, 1, 0.2]} />
        <meshStandardMaterial color="#c9cbbb" />
      </mesh>
      <mesh position={[0, 3.8, -4]}>
        <boxGeometry args={[10, 0.4, 0.2]} />
        <meshStandardMaterial color="#c9cbbb" />
      </mesh>
      {[-5, -2.5, 0, 2.5, 5].map((x) => (
        <mesh key={x} position={[x, 2.2, -4]}>
          <boxGeometry args={[0.09, 3, 0.15]} />
          <meshStandardMaterial color="#384e4d" />
        </mesh>
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[-11 + i * 2.3, 1.5 + (i % 3), -10]}>
          <boxGeometry args={[1.7, 3 + (i % 3) * 2, 2]} />
          <meshStandardMaterial color={i % 2 ? "#789199" : "#637f87"} />
        </mesh>
      ))}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.005, 0.7]}
        receiveShadow
      >
        <planeGeometry args={[6.4, 4.4]} />
        <meshStandardMaterial color="#647a75" roughness={1} />
      </mesh>
      <group onClick={onDesk}>
        <mesh position={[0, 1.03, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.3, 0.14, 1.9]} />
          <meshStandardMaterial color="#735239" roughness={0.6} />
        </mesh>
        {[-1.85, 1.85].flatMap((x) =>
          [-0.7, 0.7].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.48, z]} castShadow>
              <boxGeometry args={[0.12, 0.96, 0.12]} />
              <meshStandardMaterial color="#273d40" metalness={0.3} />
            </mesh>
          )),
        )}
        <mesh position={[0, 1.25, -0.7]}>
          <cylinderGeometry args={[0.06, 0.07, 0.5, 12]} />
          <meshStandardMaterial color="#2e4146" />
        </mesh>
        <mesh position={[0, 1.14, -0.7]}>
          <boxGeometry args={[0.8, 0.06, 0.45]} />
          <meshStandardMaterial color="#2e4146" />
        </mesh>
        <mesh position={[0, 1.95, -0.73]} castShadow>
          <boxGeometry args={[3.35, 1.95, 0.13]} />
          <meshStandardMaterial color="#1a2b32" roughness={0.45} />
        </mesh>
        <mesh position={[0, 1.95, -0.655]}>
          <planeGeometry args={[3.2, 1.8]} />
          <meshStandardMaterial
            color="#1e474b"
            emissive="#25585a"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[-0.2, 1.14, 0.46]}>
          <boxGeometry args={[1.3, 0.08, 0.43]} />
          <meshStandardMaterial color="#b2bcb2" roughness={0.5} />
        </mesh>
        {Array.from({ length: 5 }, (_, i) => (
          <mesh key={i} position={[-0.7 + i * 0.25, 1.185, 0.46]}>
            <boxGeometry args={[0.015, 0.006, 0.35]} />
            <meshStandardMaterial color="#475d5a" />
          </mesh>
        ))}
        <mesh position={[0.85, 1.15, 0.42]} scale={[0.6, 0.25, 1]}>
          <sphereGeometry args={[0.17, 16, 10]} />
          <meshStandardMaterial color="#bac4b8" />
        </mesh>
        <mesh position={[1.55, 1.25, 0.25]}>
          <cylinderGeometry args={[0.12, 0.11, 0.3, 16]} />
          <meshStandardMaterial color="#e1d9c2" />
        </mesh>
      </group>
      <group position={[0, 0, 1.65]}>
        <mesh position={[0, 0.58, 0]} castShadow>
          <boxGeometry args={[1, 0.16, 0.8]} />
          <meshStandardMaterial color="#283e45" />
        </mesh>
        <mesh position={[0, 1.02, 0.36]} castShadow>
          <boxGeometry args={[1, 0.85, 0.12]} />
          <meshStandardMaterial color="#283e45" />
        </mesh>
        {[-0.4, 0.4].flatMap((x) =>
          [-0.28, 0.28].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.27, z]}>
              <boxGeometry args={[0.07, 0.54, 0.07]} />
              <meshStandardMaterial color="#354b4b" />
            </mesh>
          )),
        )}
      </group>
      <group position={[3.6, 0, -2.5]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.4, 0.3, 0.6, 16]} />
          <meshStandardMaterial color="#a77c5a" />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 1.5, 8]} />
          <meshStandardMaterial color="#6b6247" />
        </mesh>
        {[-1, 0, 1].map((v, i) => (
          <mesh
            key={v}
            position={[v * 0.2, 1.2 + i * 0.25, 0]}
            scale={[0.6, 1, 0.35]}
            rotation={[0, 0, v * 0.5]}
            castShadow
          >
            <sphereGeometry args={[0.55, 12, 10]} />
            <meshStandardMaterial color="#496b51" />
          </mesh>
        ))}
      </group>
      <mesh position={[-3.7, 2, -3.85]}>
        <boxGeometry args={[1.3, 1.8, 0.07]} />
        <meshStandardMaterial color="#305053" />
      </mesh>
      <mesh position={[-3.7, 2, -3.79]}>
        <boxGeometry args={[0.8, 0.03, 0.02]} />
        <meshStandardMaterial color="#d5d4b8" />
      </mesh>
      {children}
    </>
  );
}
