import type { GameLog } from "../../type/type";

import "./Log.css";

export function Log({ logs }: { logs: GameLog[] }) {
  return (
    <div className="log-grid">
      <div className="section-header">
        <h2 className="section-title">遊戲日誌</h2>
      </div>
      <div className="Log-rowContainer">
        {logs.map((log, index) => (
          <div key={index} className="Log-row">
            <span className="Log-time">
              {log.round} {log.phase} 
            </span>
            <span className="Log-message"> {log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
