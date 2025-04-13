import { useState } from 'react';

const characterOptions = [
  { type: "Esnaf", psychology: 80, balance: 1000 },
  { type: "Öğrenci", psychology: 100, balance: 800 },
  { type: "Eski Futbolcu", psychology: 60, balance: 1500 }
];

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [selectedChar, setSelectedChar] = useState(characterOptions[0]);

  const handleLogin = () => {
    if (username.trim()) {
      const player = {
        username,
        character: selectedChar.type,
        balance: selectedChar.balance,
        psychology: selectedChar.psychology
      };
      localStorage.setItem("kara_bahis_user", JSON.stringify(player));
      onLogin(player);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Kara Bahis</h1>
      <input
        type="text"
        placeholder="İsmini yaz..."
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="p-2 text-black rounded w-full max-w-xs"
      />
      <select
        value={selectedChar.type}
        onChange={e => {
          const chosen = characterOptions.find(c => c.type === e.target.value);
          setSelectedChar(chosen);
        }}
        className="mt-4 p-2 text-black rounded"
      >
        {characterOptions.map(c => (
          <option key={c.type} value={c.type}>{c.type}</option>
        ))}
      </select>
      <button
        onClick={handleLogin}
        className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded"
      >
        Oyuna Başla
      </button>
    </div>
  );
};

export default Login;
