type GamePhase = "準備開始遊戲" | "事件" | "準備" | "行動" | "結算";

type ElementType = "火" | "水" | "木" | "無";
type PlayerElementType = Exclude<ElementType, "無">;
type SpellCardType = "冰凍法術" | "爆裂法術" | "毒藥法術";
type AttackCardType = "魔法棒" | SpellCardType;

type Player = {
  id: number;
  name: string;
  attack: Record<PlayerElementType, number>;
  loot: {
    gold: number;
    manaStone: number;
    spellCards: Record<AttackCardType, number>;
  };
};

type Skill = {
  name: string;
  description: string;
  trigger: "onAppear" | "onHit" | "onTurnStart" | "onTurnEnd";
  applyEffect: (
    slotID: "A" | "B" | "C",
    battlefieldSlots: [BattleFieldSlot, BattleFieldSlot, BattleFieldSlot],
    queueMonsters: Monster[],
    updateBattlefieldSlots: (
      updated: [BattleFieldSlot, BattleFieldSlot, BattleFieldSlot]
    ) => void,
    updateQueue: (updated: Monster[]) => void
  ) => void;
};

export const skillTable: Record<string, Skill> = {
  屬性輪轉: {
    name: "屬性輪轉",
    description: "每受到一次攻擊，按照 火 → 水 → 木 → 火 的順序變換屬性。",
    trigger: "onHit",
    applyEffect: (slotid, slots, queue, updateSlots, updateQueue) => {
      const order: ElementType[] = ["火", "水", "木"];
      const slotIndex = ["A", "B", "C"].indexOf(slotid);
      const monster = slots[slotIndex].monster;
      if (!monster) return;
      const nextIndex = (order.indexOf(monster.type) + 1) % order.length;
      const newType = order[nextIndex];
      monster.type = newType;
      updateSlots(
        slots.map((s, i) =>
          i === slotIndex ? { ...s, monster: { ...monster } } : s
        ) as [BattleFieldSlot, BattleFieldSlot, BattleFieldSlot]
      );
      console.log(
        `[戰場${slotid}] ${monster.name} 的屬性輪轉技能觸發，變為 ${newType}`
      );
    },
  },
  恢復: {
    name: "恢復",
    description: "每回合結束時恢復 1 點生命值。",
    trigger: "onTurnEnd",
    applyEffect: (slotid, slots, queue, updateSlots, updateQueue) => {
      const slotIndex = ["A", "B", "C"].indexOf(slotid);
      const monster = slots[slotIndex].monster;
      if (!monster) return;
      const healed = Math.min(monster.HP + 2, monster.maxHP);

      monster.HP = healed;
      updateSlots(
        slots.map((s, i) =>
          i === slotIndex ? { ...s, monster: { ...monster } } : s
        ) as [BattleFieldSlot, BattleFieldSlot, BattleFieldSlot]
      );
      console.log(
        `[戰場${slotid}] ${monster.name} 恢復技能觸發，生命恢復至 ${healed}`
      );
    },
  },
};

export const skillname = ["屬性輪轉", "恢復"];

type Monster = {
  maxHP: number;
  HP: number;
  name: string;
  type: ElementType;
  loot: {
    gold: number;
    manaStone: number;
    spellCards: SpellCardType | null;
  };
  imageUrl: string | null;
  skill: string | null;
};

type BattleFieldSlot = {
  monster: Monster | null;
  id: "A" | "B" | "C";
  poisonedBy: number[] | null;
  lastIcedBy: number | null;
};

type EventEffect = {
  description: string;
  weighted?: number;
  applyEffect: () => void;
};

type GameEvent = {
  name: string;
  weighted?: number;
  effects: [EventEffect, ...EventEffect[]];
};

type AttackAction = {
  player: Player;
  battlefieldId: "A" | "B" | "C";
  cardType: AttackCardType;
  element?: PlayerElementType;
};

type GameLog = {
  round: number;
  phase: GamePhase;
  message: string;
};

type GameState = {
  turn: number;
  phase: GamePhase;
  players: Player[];
  battlefieldmonster: [BattleFieldSlot, BattleFieldSlot, BattleFieldSlot];
  queuemonsters: Monster[];
  event: GameEvent;
  log: GameLog[];
};

export type {
  GameState,
  GameEvent,
  AttackAction,
  Player,
  Monster,
  Skill,
  ElementType,
  PlayerElementType,
  SpellCardType,
  AttackCardType,
  GamePhase,
  BattleFieldSlot,
  EventEffect,
  GameLog,
};
