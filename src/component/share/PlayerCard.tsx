import type { Player } from "../../type/type";

import "./PlayerCard.css";

import goldIcon from "../../assets/gold.png";

type OrderProps = {
  player: Player;
};

export default function PlayerCard({ player }: OrderProps) {
  return (
    <div className="player-card">
      <div className="player-header">
        <div className="id">第{player.id}組</div>
        <div className="name">{player.name}</div>
        <div className="gold">
          <img src={goldIcon} alt="gold" />
          {player.loot.gold}
        </div>
      </div>
      <div className="player-attributes">
        <div className="attribute fire">{player.attack.火}</div>
        <div className="attribute water">{player.attack.水}</div>
        <div className="attribute wood">{player.attack.木}</div>
      </div>
    </div>
  );
}
