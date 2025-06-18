export type ElementType = "火" | "水" | "木" | "無";
export type SpellCardType = "冰凍法術" | "爆裂法術" | "毒藥法術";
export type AttackCardType = "魔法棒" | SpellCardType;
export type GamePhase = "事件" | "準備" | "行動" | "結算";

export type Player = {
  id: number;
  name: string;
  attack: {
    火: number;
    水: number;
    木: number;
  };
  loot: {
    gold: number;
    manaStone: number;
    spellCards: Record<AttackCardType, number>;
  };
};

export type Monster = {
  maxHP: number;
  HP: number;
  name: string;
  type: ElementType;
  loot: {
    gold: number;
    manaStone: number;
    spellCards: SpellCardType | null;
  };
  imageUrl?: string;
};

export type BattleFieldMonster = {
  index: number;
  moster: Monster;
  poisonedBy: number[] | null;
  lastIcedBy: number | null;
};

export type BattleFieldSlot = BattleFieldMonster | null;

export type BattleLog = {
  turn: number;
  message: string;
};

export type EventEffect = {
  description: string;
  weighted?: number;
  applyEffect: () => void;
};

export type GameEvent = {
  name: string;
  description: string;
  weighted: number;
  effects?: EventEffect | EventEffect[];
};

export type AttackAction = {
  playerId: number;
  battleFieldIndex: 0 | 1 | 2;
  cardType: AttackCardType;
  element?: ElementType; // 僅魔法棒需要
  power?: number; // 僅魔法棒需要（例如基礎攻擊力）
};

type GameLog = {
  round: number;
  messege: string;
};

export type GameState = {
  turn: number;
  phase: GamePhase;
  players: Player[];
  battlefieldmonster: [
    BattleFieldMonster | null,
    BattleFieldMonster | null,
    BattleFieldMonster | null
  ];
  queuemonsters: Monster[];
  event: GameEvent;
  log: GameLog[];
};
