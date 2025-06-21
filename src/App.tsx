import { useRef, useState, useEffect } from "react";

import type { GameState } from "./type/type";

import { Battlefield } from "./component/game/Battlefield";
import { MonsterQueue } from "./component/game/MonsterQueue";
import { Order } from "./component/game/Order";
import { EventCard } from "./component/game/EventCard";

import "./App.css";

export default function GameView() {
  const [serverUrl, setServerUrl] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [secondsAgo, setSecondsAgo] = useState<number>(0);
  const [delay, setDelay] = useState<number>(0);
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
      // ✅ 儲存 GameState 與更新時間
      if (data.payload) {
        setGameState(data.payload);
      }
      if (data.timestamp) {
        setLastUpdate(data.timestamp);
        setSecondsAgo(0); // 重置秒數
        setDelay(Date.now() - data.timestamp); // 計算延遲
      }
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdate) {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - lastUpdate) / 1000);
        setSecondsAgo(diffInSeconds);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);
  // ✅ 顯示時間格式
  const formatTimestamp = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleString(); // 例如 "2025/6/19 下午 3:21:09"
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

      {connected && lastUpdate && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 12,
            fontSize: 14,
            color: "white",
          }}
        >
          伺服器資料更新：{formatTimestamp(lastUpdate)} ⏱ 更新於：{secondsAgo}{" "}
          秒前 延遲{delay}ms
        </div>
      )}

      {connected && gameState && (
        <div className="main-container">
          <div className="left-section">
            <Order players={gameState.players} />
          </div>
          <div className="middle-section">
            <div>
              第{gameState.turn}回合 {gameState.phase}階段
            </div>
            <div className="battlefield-wrapper">
              <Battlefield slots={gameState.battlefieldmonster} />
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
      )}
    </>
  );
}
