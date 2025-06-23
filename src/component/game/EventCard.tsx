import "./EventCard.css";
import type { GameEvent } from "../../type/type";

type GameEventProps = {
  event: GameEvent;
};

export function EventCard({ event }: GameEventProps) {
  const effect = event.effects[0];
  return (
    <div className={"Event-card"}>
      <header className="Event-card-header">
        <div className="section-header">
          <h2 className="section-title">本局事件</h2>
        </div>
        <h3 className="Event-name">{event ? `${event.name} :` : "未知事件"}</h3>
      </header>

      <div className="Event-card-body">
        <h3 className="Event-description">{effect.description}</h3>
      </div>
    </div>
  );
}
