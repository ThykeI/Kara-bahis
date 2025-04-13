import { useEffect, useState } from 'react';
import Login from './components/Login';
import Game from './components/Game';

function App() {
  const [player, setPlayer] = useState(null);
  const [bgmOn, setBgmOn] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("kara_bahis_user");
    if (saved) {
      setPlayer(JSON.parse(saved));
    }

    const bg = new Audio("/sounds/bg.mp3");
    bg.loop = true;
    if (bgmOn) {
      bg.play();
    } else {
      bg.pause();
    }

    return () => bg.pause();
  }, [bgmOn]);

  const getPsychoClass = (psy) => {
    if (psy > 70) return "bg-normal";
    if (psy > 30) return "bg-anxious";
    return "bg-collapse";
  };

  const isNight = () => {
    const hour = new Date().getHours();
    return hour >= 0 && hour < 6;
  };

  return (
    <div className={`min-h-screen font-sans ${player ? getPsychoClass(player.psychology) : ''} ${isNight() ? 'bg-night' : ''}`}>
      {player && (
        <button
          className="fixed top-2 right-2 bg-gray-700 px-3 py-1 rounded"
          onClick={() => setBgmOn(!bgmOn)}
        >
          {bgmOn ? "Müziği Kapat" : "Müziği Aç"}
        </button>
      )}
      {!player ? <Login onLogin={setPlayer} /> : <Game player={player} setPlayer={setPlayer} />}
    </div>
  );
}

export default App;
