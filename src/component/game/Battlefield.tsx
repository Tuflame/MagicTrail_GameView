import type { BattleFieldSlot } from "../../type/type";
import MonsterCard from "../share/MonsterCard";
import "./Battlefield.css";

export function Battlefield({
  slots,
}: {
  slots: [BattleFieldSlot, BattleFieldSlot, BattleFieldSlot];
}) {
  return (
    <div className="battlefield">
      <div className="section-header">
        <h2 className="section-title">戰場區域</h2>
      </div>
      <div className="battlefield-rowContainer">
        {slots.map((slot, index) =>
          slot.monster ? (
            <MonsterCard key={index} monster={slot.monster} />
          ) : (
            <div key={index} className="monster-slot empty">
              （空）
            </div>
          )
        )}
      </div>
    </div>
  );
}
