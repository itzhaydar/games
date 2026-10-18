import { MapPin, Clock3, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
export default function GameHud({
  region,
  balance,
}: {
  region: string;
  balance?: number;
}) {
  const [minutes, setMinutes] = useState(8 * 60);
  useEffect(() => {
    const timer = setInterval(
      () => setMinutes((m) => (m + 1) % (24 * 60)),
      60000,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="game-hud" aria-label="Game status">
      <div>
        <span className="hud-avatar">F</span>
        <span>
          Founder
          <small>
            <MapPin size={11} /> Founder House · {region}
          </small>
        </span>
      </div>
      <div className="hud-clock">
        <Clock3 size={14} />
        {String(Math.floor(minutes / 60)).padStart(2, "0")}:
        {String(minutes % 60).padStart(2, "0")}
        {balance !== undefined && (
          <span>
            <Wallet size={14} />
            {balance.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}
