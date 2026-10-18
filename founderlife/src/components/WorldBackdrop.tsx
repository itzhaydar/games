import { lazy, Suspense } from "react";
import { SceneBoundary } from "./SceneBoundary";
const UrbanWorld = lazy(() => import("../game/UrbanWorld"));
export default function WorldBackdrop() {
  return (
    <div className="world-backdrop" aria-hidden="true">
      <SceneBoundary
        fallback={
          <div className="world-offline">
            3D scene unavailable · menu remains usable
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="world-offline">Preparing 3D environment…</div>
          }
        >
          <UrbanWorld />
        </Suspense>
      </SceneBoundary>
      <div className="world-vignette" />
    </div>
  );
}
