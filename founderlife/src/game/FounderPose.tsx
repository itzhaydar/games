import type { Gender } from "../state/store";
/** Temporary original pose rig, not a licensed realistic/skinned human asset.
 * The same pose contract can be driven by a GLB animation mixer later.
 */
export type FounderPose = {
  seated: number;
  position: [number, number, number];
};
export default function Founder({
  pose,
  gender,
}: {
  pose: FounderPose;
  gender: Gender;
}) {
  const s = pose.seated;
  const suit =
    gender === "Female" ? "#536a68" : gender === "Male" ? "#364b5a" : "#6b6a59";
  return (
    <group position={pose.position}>
      <group position={[0, 1.03 - s * 0.34, 0]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <capsuleGeometry args={[0.23, 0.37, 5, 12]} />
          <meshStandardMaterial color={suit} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.77, 0]} castShadow>
          <sphereGeometry args={[0.19, 16, 12]} />
          <meshStandardMaterial color="#b4a48c" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.89, 0.015]} scale={[1, 0.6, 1]}>
          <sphereGeometry args={[0.2, 16, 12]} />
          <meshStandardMaterial color="#36413c" />
        </mesh>
        <mesh position={[0, 0.73, -0.16]}>
          <boxGeometry args={[0.08, 0.06, 0.09]} />
          <meshStandardMaterial color="#b4a48c" />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side}>
            <group
              position={[side * 0.14, 0, 0]}
              rotation={[(s * Math.PI) / 2, 0, 0]}
            >
              <mesh position={[0, -0.22, 0]} castShadow>
                <capsuleGeometry args={[0.1, 0.28, 4, 10]} />
                <meshStandardMaterial color={suit} />
              </mesh>
              <group
                position={[0, -0.44, 0]}
                rotation={[(-s * Math.PI) / 2, 0, 0]}
              >
                <mesh position={[0, -0.23, 0]} castShadow>
                  <capsuleGeometry args={[0.085, 0.3, 4, 10]} />
                  <meshStandardMaterial color="#293b42" />
                </mesh>
                <mesh position={[0, -0.47, -0.08]}>
                  <boxGeometry args={[0.19, 0.12, 0.33]} />
                  <meshStandardMaterial color="#263337" />
                </mesh>
              </group>
            </group>
            <group
              position={[side * 0.29, 0.7, -s * 0.25]}
              rotation={[s * 0.9, 0, side * 0.08]}
            >
              <mesh position={[0, -0.18, 0]} castShadow>
                <capsuleGeometry args={[0.075, 0.22, 4, 10]} />
                <meshStandardMaterial color={suit} />
              </mesh>
              <group position={[0, -0.35, 0]} rotation={[s * 0.55, 0, 0]}>
                <mesh position={[0, -0.16, 0]}>
                  <capsuleGeometry args={[0.06, 0.2, 4, 10]} />
                  <meshStandardMaterial color={suit} />
                </mesh>
                <mesh position={[0, -0.34, 0]}>
                  <sphereGeometry args={[0.075, 10, 8]} />
                  <meshStandardMaterial color="#b4a48c" />
                </mesh>
              </group>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}
