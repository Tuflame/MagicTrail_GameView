import React from "react";
import type { Monster, SpellCardType } from "../../type/type";

import "./MonsterCard.css";

import goldIcon from "../../assets/gold.png";
import manaStoneIcon from "../../assets/manastone.png";
// import spellCardsIcon from "../../assets/spellCards.png";

import spellIceIcon from "../../assets/spell/spell_ice.png";
import spellBoomIcon from "../../assets/spell/spell_boom.png";
import spellPoisonIcon from "../../assets/spell/spell_poison.png";

type MonsterCardProps = {
  monster: Monster;
  size?: "small" | "normal";
};

export default function MonsterCard({ monster }: MonsterCardProps) {
  return (
    <div className={"monster-card"} data-type={monster.type.toLowerCase()}>
      <header className="monster-card-header">
        <span className="monster-type">{monster.type}</span>
        <span className="monster-health">
          ❤️ {monster.HP} / {monster.maxHP}
        </span>
      </header>

      <div className="monster-card-body">
        <div className="monster-image">👾</div>
        <h3 className="monster-name">{monster.name}</h3>
        {monster.skill && (
          <div className="monster-skill-container">
            <h3 className="monster-skill">{monster.skill}</h3>
          </div>
        )}
      </div>

      <footer className="monster-card-footer">
        {lootContainer(monster.loot)}
      </footer>
    </div>
  );
}

function lootContainer(loot: Monster["loot"]) {
  const lootItems = [];

  if (loot.gold > 0) {
    lootItems.push(<LootItem key="gold" type="gold" value={loot.gold} />);
  }
  if (loot.manaStone > 0) {
    lootItems.push(
      <LootItem key="manaStone" type="manaStone" value={loot.manaStone} />
    );
  }
  if (loot.spellCards !== null) {
    lootItems.push(
      <LootItem key="spellCards" type="spellCards" value={loot.spellCards} />
    );
  }

  return (
    <div
      className="lootContainer"
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "space-evenly",
        width: "100%",
      }}>
      {lootItems}
    </div>
  );
}

// Testing
function LootItem({ type, value }: { type: string; value: number | string }) {
  const lootConfig = {
    gold: { icon: goldIcon, label: "" },
    manaStone: { icon: manaStoneIcon, label: "" },
    spellCards: { icon: spellIceIcon, label: "" }, // Provide a default icon for spellCards
  };

  const spellCardIcons: Record<SpellCardType, string> = {
    冰凍法術: spellIceIcon,
    爆裂法術: spellBoomIcon,
    毒藥法術: spellPoisonIcon,
  };

  const config = lootConfig[type as keyof typeof lootConfig];
  if (!config) return null;

  const count = value;
  // 如果是法術卡，使用對應的法術圖示
  let iconSrc = "";
  if (type === "spellCards" && typeof value === "string") {
    iconSrc = spellCardIcons[value as SpellCardType];
  } else {
    iconSrc = config.icon;
  }

  return (
    <div
      className="LootItem"
      style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <img className="LootIcon" src={iconSrc} alt={config.label} />
      <span className="LootTimes">x </span>
      <span className="LootAmount">
        {typeof count === "number" && count !== 0 ? count : 1}
      </span>
    </div>
  );
}

// function LootItem({ type, value }: { type: string; value: number | string }) {
//   const lootConfig = {
//     gold: { icon: goldIcon, label: "Gold" },
//     manaStone: { icon: manaStoneIcon, label: "Mana Stone" },
//     // spellCards 不放這裡，因為它是特殊處理
//   };

//   const spellCardIcons: Record<SpellCardType, string> = {
//     冰凍法術: spellIceIcon,
//     爆裂法術: spellBoomIcon,
//     毒藥法術: spellPoisonIcon,
//   };

//   // 取得圖示與 label
//   let iconSrc = "";
//   let label = "";

//   if (type === "spellCards" && typeof value === "string") {
//     iconSrc = spellCardIcons[value];
//     label = value;
//   } else if (type in lootConfig && typeof value === "number") {
//     iconSrc = lootConfig[type].icon;
//     label = lootConfig[type].label;
//   } else {
//     return null;
//   }

//   return (
//     <div
//       className="LootItem"
//       style={{ display: "flex", alignItems: "center", gap: "4px" }}
//     >
//       <img src={iconSrc} alt={label} style={{ width: "32px", height: "32px" }} />
//       <span style={{ fontSize: "16px", fontWeight: "bold" }}>
//         x {value}
//       </span>
//     </div>
//   );
// }
