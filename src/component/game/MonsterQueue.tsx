import "./MonsterQueue.css";
import type { Monster } from "../../type/type";
import MonsterCard from "../share/MonsterCard";

//FIXME:目前跟列隊有關的會出錯

export function MonsterQueue({ monsters }: { monsters: Monster[] }) {
  return (
    <div className="monsterqueue-grid">
      <div className="section-header">
        <h2 className="section-title">列隊區域</h2>
      </div>
      <div className="MonsterQueue-rowContainer">
        {monsters.map((monster, index) => (
          <MonsterCard key={index} monster={monster} />
        ))}
      </div>
    </div>
  );
}
