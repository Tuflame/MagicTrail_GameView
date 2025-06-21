type GamePhase = "遊戲開始" | "事件" | "準備" | "行動" | "結算";

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
  applyEffect: () => void;
};

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
  skill?: Skill[];
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
  effects: EventEffect | EventEffect[];
};

type AttackAction = {
  player: Player;
  battlefieldId: "A" | "B" | "C";
  cardType: AttackCardType;
  element?: PlayerElementType;
};

type GameLog = {
  round: number;
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
