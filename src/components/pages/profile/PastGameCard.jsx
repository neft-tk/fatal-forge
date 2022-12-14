import Static from '../../../utils/staticHelper';

function PastGameCard({ deck }) {
  return (
    <>
      {/* TODO: Only model first card, map over victory/defeats from user. */}
      <div className="flex flex-col m-6 items-center border-2 border-red-500 justify-around rounded bg-main-bg">
        <h3 className="text-red-500 text-2xl font-bold mb-4">Defeat...</h3>
        <div className="flex justify-around items-center w-full">
          <div className="flex flex-col items-center">
            <h3 className="text-main-text text-lg mb-2">Deck Used: </h3>
            <img
              className="w-16 h-16 mb-2 border-2 border-black rounded-lg"
              src={`${Static.serverUrl}/api/images/${deck[0].imagePath}`}
              alt="Deck's Back of Card"
            />
            <h3 className="text-main-text text-lg">{deck[0].deckName}</h3>
          </div>
          <div>
            <h3 className="text-center text-2xl font-bold text-main-text">
              VS.
            </h3>
          </div>
          <div className="flex flex-col text-center">
            <img
              className="w-28 h-28 mb-4 border-2 border-black rounded-lg"
              src={`${Static.serverUrl}/api/images/profile/Vkorn.png`}
              alt="Opponent's picture"
            ></img>
            <p className="text-lg">VKorn</p>
          </div>
        </div>
      </div>

      {/* TODO: Delete these placeholders when real data comes in. */}
      <div className="flex flex-col m-6 items-center border-2 border-green-900 justify-around rounded bg-main-bg">
        <h3 className="text-green-900 text-2xl font-bold mb-4">Victory!</h3>
        <div className="flex justify-around items-center w-full">
          <div className="flex flex-col items-center">
            <h3 className="text-main-text text-lg mb-2">Deck Used: </h3>
            <img
              className="w-16 h-16 mb-2 border-2 border-black rounded-lg"
              src={`${Static.serverUrl}/api/images/${deck[0].imagePath}`}
              alt="Deck's Back of Card"
            />
            <h3 className="text-main-text text-lg">{deck[0].deckName}</h3>
          </div>
          <div>
            <h3 className="text-center text-2xl font-bold text-main-text">
              VS.
            </h3>
          </div>
          <div className="flex flex-col text-center">
            <img
              className="w-28 h-28 mb-4 border-2 border-black rounded-lg"
              src={`${Static.serverUrl}/api/images/profile/Vkorn.png`}
              alt="Opponent's picture"
            ></img>
            <p className="text-lg">VKorn</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PastGameCard;
