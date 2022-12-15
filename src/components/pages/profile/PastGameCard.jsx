import Static from '../../../utils/staticHelper';

function PastGameCard({ deck }) {
  return (
    <>
      {/* TODO: Only model first card, map over victory/defeats from user. */}
      <div className="bg-main-bg border-red-700 flex flex-col m-6 p-4 items-center border-2 justify-around rounded-2xl">
        <h3 className="text-red-700 text-2xl font-bold mb-4 font-display-text-f">Defeat...</h3>
        <div className="flex flex-col lg:flex-row justify-around items-center w-full">
          <div className="flex flex-col center-all">
            <img
              className="min-w-28 min-h-28 max-w-40 max-h-40 border-black mb-2 border-2 rounded-lg"
              src={`${Static.serverUrl}/api/images/${deck[0].imagePath}`}
              alt="Deck's Back of Card"
            />
            <h3 className="text-main-text text-lg font-alt-text-f">{deck[0].deckName}</h3>
          </div>
          <div>
            <h3 className="text-main-text text-center text-2xl font-bold font-alt-text-f mx-4">
              VS.
            </h3>
          </div>
          <div className="flex flex-col center-all">
            <img
              className="min-w-28 min-h-28 max-w-40 max-h-40 mb-4 border-2 border-black rounded-lg"
              src={`${Static.serverUrl}/api/images/profile/Vkorn.png`}
              alt="Opponent's picture"
            ></img>
            <p className="text-lg font-alt-text-f">VKorn</p>
          </div>
        </div>
      </div>
      <div className="bg-main-bg border-green-700 flex flex-col m-6 p-4 items-center border-2 justify-around rounded-2xl">
        <h3 className="text-green-700 text-2xl font-bold mb-4 font-display-text-f">Victory!</h3>
        <div className="flex justify-around items-center w-full">
          <div className="flex flex-col center-all">
            <img
              className="min-w-28 min-h-28 max-w-40 max-h-40 border-black mb-2 border-2 rounded-lg"
              src={`${Static.serverUrl}/api/images/${deck[0].imagePath}`}
              alt="Deck's Back of Card"
            />
            <h3 className="text-main-text text-lg font-alt-text-f">{deck[0].deckName}</h3>
          </div>
          <div>
            <h3 className="text-main-text text-center text-2xl font-bold font-alt-text-f mx-4">
              VS.
            </h3>
          </div>
          <div className="flex flex-col center-all">
            <img
              className="min-w-28 min-h-28 max-w-40 max-h-40 mb-4 border-2 border-black rounded-lg"
              src={`${Static.serverUrl}/api/images/profile/Vkorn.png`}
              alt="Opponent's picture"
            ></img>
            <p className="text-lg font-alt-text-f">VKorn</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PastGameCard;
