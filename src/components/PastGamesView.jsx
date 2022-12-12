import PastGameCard from "./PastGameCard";

function PastGamesView() {
  return (
    <div className="w-full h-96 border-4 rounded border-gray-300 bg-gray-500">
      <h2 className="text-center m-2">Past Matches:</h2>
      <PastGameCard />
    </div>
  );
}

export default PastGamesView;
