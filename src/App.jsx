import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [match, setMatch] = useState(null);
  const [prediction, setPrediction] = useState({ scoreA: 0, scoreB: 0 });
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(\`\${API}/next_match\`)
      .then(res => res.json())
      .then(data => setMatch(data));
  }, []);

  const submit = () => {
    fetch(\`\${API}/submit_prediction\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        name,
        matchId: match.id,
        scoreA: prediction.scoreA,
        scoreB: prediction.scoreB
      })
    }).then(() => alert("✅ Прогноз отправлен!"));
  };

  if (!match || match.message) return <p>Нет матчей сегодня</p>;

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>🏒 Прогноз на матч</h1>
      <p><b>{match.teamA}</b> vs <b>{match.teamB}</b></p>
      <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="ID Telegram" value={userId} onChange={e => setUserId(e.target.value)} />
      <div style={{ marginTop: 10 }}>
        <input
          type="number"
          value={prediction.scoreA}
          onChange={e => setPrediction({ ...prediction, scoreA: Number(e.target.value) })}
        />
        <span> : </span>
        <input
          type="number"
          value={prediction.scoreB}
          onChange={e => setPrediction({ ...prediction, scoreB: Number(e.target.value) })}
        />
      </div>
      <button style={{ marginTop: 10 }} onClick={submit}>Отправить</button>
    </div>
  );
}
