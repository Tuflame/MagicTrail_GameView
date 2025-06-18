import { useRef, useState } from "react";

import type { GameState } from "./type/type";

import { Battlefield } from "./component/game/Battlefield";
import { MonsterQueue } from "./component/game/MonsterQueue";
import { Order } from "./component/game/Order";
import { EventCard } from "./component/game/EventCard";

import "./App.css";

const defaultGameState: GameState = {
  turn: 1,
  phase: "事件",
  players: [
    {
      id: 1,
      name: "Player 1",
      attack: {
        火: 1,
        水: 1,
        木: 1,
      },
      loot: {
        gold: 0,
        manaStone: 2,
        spellCards: {
          魔法棒: 1,
          冰凍法術: 0,
          爆裂法術: 0,
          毒藥法術: 0,
        },
      },
    },
    {
      id: 2,
      name: "Player 2",
      attack: {
        火: 1,
        水: 1,
        木: 1,
      },
      loot: {
        gold: 0,
        manaStone: 2,
        spellCards: {
          魔法棒: 1,
          冰凍法術: 0,
          爆裂法術: 0,
          毒藥法術: 0,
        },
      },
    },
    {
      id: 3,
      name: "Player 3",
      attack: {
        火: 1,
        水: 1,
        木: 1,
      },
      loot: {
        gold: 0,
        manaStone: 2,
        spellCards: {
          魔法棒: 1,
          冰凍法術: 0,
          爆裂法術: 0,
          毒藥法術: 0,
        },
      },
    },
    {
      id: 4,
      name: "Player 4",
      attack: {
        火: 1,
        水: 1,
        木: 1,
      },
      loot: {
        gold: 0,
        manaStone: 2,
        spellCards: {
          魔法棒: 1,
          冰凍法術: 0,
          爆裂法術: 0,
          毒藥法術: 0,
        },
      },
    },
    {
      id: 5,
      name: "Player 5",
      attack: {
        火: 1,
        水: 1,
        木: 1,
      },
      loot: {
        gold: 0,
        manaStone: 2,
        spellCards: {
          魔法棒: 1,
          冰凍法術: 0,
          爆裂法術: 0,
          毒藥法術: 0,
        },
      },
    },
    {
      id: 6,
      name: "Player 6",
      attack: {
        火: 1,
        水: 1,
        木: 1,
      },
      loot: {
        gold: 0,
        manaStone: 2,
        spellCards: {
          魔法棒: 1,
          冰凍法術: 0,
          爆裂法術: 0,
          毒藥法術: 0,
        },
      },
    },
  ],
  battlefieldmonster: [null, null, null],
  queuemonsters: [],
  event: {
    name: "無事件",
    description: "本回合風平浪靜，什麼也沒發生。",
    weighted: 3,
    effects: {
      description: "本回合風平浪靜，什麼也沒發生。",
      applyEffect: () => {
        console.log("本回合風平浪靜，什麼也沒發生。");
        // 可設計 setPlayers(p => ...) 加值處理
      },
    },
  },
  log: [],
};

export default function GameView() {
  const [serverUrl, setServerUrl] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const handleConnect = () => {
    if (!serverUrl.startsWith("ws://") && !serverUrl.startsWith("wss://")) {
      alert(`\{${serverUrl}\}請輸入有效的 WebSocket 位址（ws:// 或 wss://）`);
      return;
    }

    const ws = new WebSocket(serverUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ 已連線到伺服器");
      setConnected(true);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      setGameState(data);
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket 錯誤", err);
      alert("無法連線到伺服器，請確認地址是否正確");
    };

    ws.onclose = () => {
      console.log("🔌 連線已中斷");
      setConnected(false);
    };
  };

  return (
    <>
      {!connected && (
        <div className="coverModal">
          <div className="contain">
            <h2>輸入伺服器 WebSocket 位址</h2>
            <input
              type="text"
              placeholder="例如 ws://localhost:8080"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
            />
            <button onClick={handleConnect}>連線</button>
          </div>
        </div>
      )}
      <div className="main-container">
        <div className="left-section">
          <Order players={gameState.players} />
        </div>
        <div className="middle-section">
          <div className="battlefield-wrapper">
            <Battlefield monsters={gameState.battlefieldmonster} />
          </div>
          <div className="queue-wrapper">
            <MonsterQueue monsters={gameState.queuemonsters} />
          </div>
        </div>

        <div className="right-section">
          <div className="WorldEvent-wrapper">
            {event ? (
              <EventCard event={gameState.event} /> /* if 有 event 建立卡片*/
            ) : (
              <p>無事件資料</p> /* if 有 event 建立卡片*/
            )}
          </div>
          <div className="log-wrapper"></div>
        </div>
      </div>
    </>
  );
}
