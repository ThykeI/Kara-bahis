const MatchCard = ({ match, onBet }) => {
  const { team1, team2, odds } = match;

  return (
    <div className="bg-gray-700 p-4 rounded shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <span>{team1.name}</span>
        <span className="font-bold">vs</span>
        <span>{team2.name}</span>
      </div>
      <div className="flex justify-around mt-2">
        {["1", "X", "2"].map((opt) => (
          <button
            key={opt}
            onClick={() => onBet(opt)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
          >
            {opt} ({odds[opt]})
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatchCard;
