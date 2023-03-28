import Static from '../../../utils/staticHelper';

function PastGameCard({ deck }) {
  return (
    <>
      {/* TODO: Only model first card, map over victory/defeats from user. */}
      <div className="bg-main-bg border-red-700 flex flex-col m-4 p-6 items-center border-2 justify-around rounded-2xl">
        <h3 className="text-red-700 text-lg lg:text-2xl font-bold mb-4 font-display-text-f">Defeat...</h3>
        <div className="card-flex flex-row md:flex-col xl:flex-row center-all w-full">
          <div className="flex flex-col center-all">
            <img
              className="w-12 h-12 md:w-16 md:h-16 2xl:w-24 2xl:h-24 border-black mb-2 border-2 rounded-lg"
              src={`${Static.serverUrl}/api/images/${deck[0].imagePath}`}
              alt="Deck's Back of Card"
            />
            <h3 className="text-main-text text-md md:text-lg font-alt-text-f">{deck[0].deckName}</h3>
          </div>
          <div>
            <h3 className="text-main-text text-center text-2xl font-bold font-alt-text-f m-4">
              VS.
            </h3>
          </div>
          <div className="flex flex-col center-all">
            <img
              className="w-12 h-12 md:w-16 md:h-16 2xl:w-24 2xl:h-24 mb-4 border-2 border-black rounded-lg"
              src={`${Static.serverUrl}/api/images/profile/username.png`}
              alt="Opponent's visual representation"
            ></img>
            <p className="text-md md:text-lg font-alt-text-f">SomeGuy</p>
          </div>
        </div>
      </div>
      <div className="bg-main-bg border-green-700 flex flex-col m-4 p-6 items-center border-2 justify-around rounded-2xl">
        <h3 className="text-green-700 text-lg lg:text-2xl font-bold mb-4 font-display-text-f">Victory!</h3>
        <div className="card-flex flex-row md:flex-col xl:flex-rowcenter-all w-full">
          <div className="flex flex-col center-all">
            <img
              className="w-12 h-12 md:w-16 md:h-16 2xl:w-24 2xl:h-24 border-black mb-2 border-2 rounded-lg"
              src={`${Static.serverUrl}/api/images/${deck[0].imagePath}`}
              alt="Deck's Back of Card"
            />
            <h3 className="text-main-text text-md md:text-lg font-alt-text-f">{deck[0].deckName}</h3>
          </div>
          <div>
            <h3 className="text-main-text text-center text-2xl font-bold font-alt-text-f mx-4">
              VS.
            </h3>
          </div>
          <div className="flex flex-col center-all">
            <img
              className="w-12 h-12 md:w-16 md:h-16 2xl:w-24 2xl:h-24 mb-4 border-2 border-black rounded-lg"
              src={`${Static.serverUrl}/api/images/profile/username.png`}
              alt="Opponent's visual representation"
            ></img>
            <p className="text-md md:text-lg font-alt-text-f">SomeGuy</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PastGameCard;
