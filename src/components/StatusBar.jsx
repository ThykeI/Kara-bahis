const StatusBar = ({ player }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md text-sm">
      <div>Oyuncu: <strong>{player.username}</strong></div>
      <div>Bakiye: <strong>{player.balance} ₺</strong></div>
      <div>Psikoloji:
        <div className="w-24 h-2 bg-gray-600 rounded inline-block ml-2">
          <div className="h-2 bg-red-500 rounded" style={{ width: `${player.psychology}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
