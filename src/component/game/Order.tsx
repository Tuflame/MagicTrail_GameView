import type { Player } from "../../type/type";
import PlayerCard from "../share/PlayerCard";

import "./Order.css";

type OrderProps = {
  players: Player[];
};

export function Order({ players }: OrderProps) {
  return (
    <div className="player-container">
      {players.map((player) => (
        <PlayerCard player={player} />
      ))}
    </div>
  );
}
