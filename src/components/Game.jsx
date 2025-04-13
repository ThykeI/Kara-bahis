import { useEffect, useState } from 'react';
import { teams } from '../data/teams';
import MatchCard from './MatchCard';
import StatusBar from './StatusBar';

const generateMatches = () => {
  const matches = [];
  for (let i = 0; i < 30; i++) {
    const shuffled = [...teams].sort(() => 0.5 - Math.random());
    const team1 = shuffled[0];
    const team2 = shuffled[1];
    const odds = {
      "1": (Math.random() * 3 + 1).toFixed(2),
      "X": (Math.random() * 2 + 2).toFixed(2),
      "2": (Math.random() * 3 + 1).toFixed(2),
    };
    matches.push({ id: i, team1, team2, odds, result: null });
  }
  return matches;
};

const Game = ({ player, setPlayer }) => {
  const [matches, setMatches] = useState(generateMatches());
  const [betAmount, setBetAmount] = useState("");
  const [history, setHistory] = useState([]);

  const playSound = (type) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play();
  };

  const handleBet = (matchIndex, choice) => {
    const amount = parseFloat(betAmount);
    if (!amount || amount <= 0 || amount > player.balance) {
      alert("Geçersiz bahis miktarı!");
      return;
    }

    const match = matches[matchIndex];
    const resultOptions = ["1", "X", "2"];
    const realResult = resultOptions[Math.floor(Math.random() * 3)];

    let updatedBalance = player.balance;
    let updatedPsy = player.psychology;

    if (choice === realResult) {
      const win = amount * parseFloat(match.odds[choice]);
      updatedBalance += win;
      playSound("win");
      alert(`Kazandın! ${win.toFixed(2)} ₺ kazandın.`);
    } else {
      updatedBalance -= amount;
      const loss = Math.floor(Math.random() * 10) + 5;
      updatedPsy -= loss;
      playSound("lose");
      alert(`Kaybettin! Psikolojin ${loss} düştü.`);
    }

    const updatedPlayer = {
      ...player,
      balance: Math.max(0, parseFloat(updatedBalance.toFixed(2))),
      psychology: Math.max(0, updatedPsy)
    };

    setHistory(prev => [
      {
        match: `${match.team1.name} vs ${match.team2.name}`,
        selected: choice,
        actual: realResult,
        amount,
        won: choice === realResult,
      },
      ...prev
    ]);

    localStorage.setItem("kara_bahis_user", JSON.stringify(updatedPlayer));
    setPlayer(updatedPlayer);

    if (updatedPlayer.psychology <= 0) {
      setTimeout(() => {
        alert("Karakter psikolojik çöküş yaşadı ve intihar etti...");
        localStorage.removeItem("kara_bahis_user");
        window.location.reload();
      }, 500);
    }
  };

  const getTherapy = () => {
    if (player.balance < 250) {
      alert("Terapiste gidecek paran yok.");
      return;
    }

    const success = Math.random() > 0.3;
    const newPsy = success ? Math.min(100, player.psychology + 40) : player.psychology;
    const newBal = player.balance - 250;

    const msg = success ? "Terapist işe yaradı. Psikolojin arttı!" : "Terapist seni reddetti. Hiçbir şey değişmedi.";
    alert(msg);

    const updated = { ...player, psychology: newPsy, balance: newBal };
    setPlayer(updated);
    localStorage.setItem("kara_bahis_user", JSON.stringify(updated));
  };

  return (
    <div className="p-4">
      <StatusBar player={player} />
      <div className="mb-4">
        <input
          type="number"
          placeholder="Bahis miktarı gir"
          className="text-black px-2 py-1 rounded w-40"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <button
          onClick={getTherapy}
          className="ml-4 bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded"
        >
          Terapiste Git (250 ₺)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match, idx) => (
          <MatchCard key={match.id} match={match} onBet={(choice) => handleBet(idx, choice)} />
        ))}
      </div>

      <div className="mt-6 bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Bahis Geçmişi</h2>
        <ul className="text-sm space-y-1 max-h-60 overflow-auto">
          {history.map((item, i) => (
            <li key={i} className={item.won ? 'text-green-400' : 'text-red-400'}>
              {item.match} → Seçim: {item.selected}, Sonuç: {item.actual} → {item.won ? 'Kazandın' : 'Kaybettin'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
