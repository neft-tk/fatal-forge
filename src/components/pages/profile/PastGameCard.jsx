import Static from '../../../utils/staticHelper';

function PastGameCard({deck}) {
  return (
    <>
      {/* TODO: Only model first card, map over victory/defeats from user. */}
      <div className="flex m-4 p-4 items-center border-2 border-red-800 justify-around rounded">
        <div className="flex flex-col">
          <h3 className="text-red-800 text-2xl font-bold mb-4">Defeat...</h3>
          <h3 className="text-main-text text-lg font-bold mb-2">Deck Used: </h3>
          <img
            className='w-16 h-16 mb-2'
            src={`${Static.serverUrl}/api/images/${deck[0].imagePath}`}
            alt="Deck's Back of Card"
          />
          <h3 className="text-main-text text-lg font-bold">{deck[0].deckName}</h3>
        </div>
        <div>
          <h3 className='text-center text-2xl font-bold'>VS.</h3>
        </div>
        <div className="flex flex-col text-center">
          <img
            className="w-28 h-28 mb-4"
            src={`${Static.serverUrl}/api/images/profile/Vkorn.png`}
            alt="Opponent's picture"
          ></img>
          <p className="font-bold">VKorn</p>
        </div>
      </div>

      {/* TODO: Delete these placeholders when real data comes in. */}
      <div className="flex m-4 p-4 items-center border-2 border-green-800 justify-around rounded">
      <div className="flex flex-col">
        <h3 className="text-green-800 text-2xl font-bold mb-4">Victory!</h3>
        <h3 className="text-main-text text-lg font-bold mb-2">Deck Used: </h3>
        <img
          className='w-16 h-16 mb-2'
          src={`${Static.serverUrl}/api/images/${deck[1].imagePath}`}
          alt="Deck's Back of Card"
        />
        <h3 className="text-main-text text-lg font-bold">{deck[1].deckName}</h3>
      </div>
      <div>
        <h3 className='text-center text-2xl font-bold'>VS.</h3>
      </div>
      <div className="flex flex-col text-center">
        <img
          className="w-28 h-28 mb-4"
          src={`${Static.serverUrl}/api/images/profile/Vkorn.png`}
          alt="Opponent's picture"
        ></img>
        <p className="font-bold">VKorn</p>
      </div>
    </div>
    <div className="flex m-4 p-4 items-center border-2 border-green-800 justify-around rounded">
      <div className="flex flex-col">
        <h3 className="text-green-800 text-2xl font-bold mb-4">Victory!</h3>
        <h3 className="text-main-text text-lg font-bold mb-2">Deck Used: </h3>
        <img
          className='w-16 h-16 mb-2'
          src={`${Static.serverUrl}/api/images/${deck[1].imagePath}`}
          alt="Deck's Back of Card"
        />
        <h3 className="text-main-text text-lg font-bold">{deck[1].deckName}</h3>
      </div>
      <div>
        <h3 className='text-center text-2xl font-bold'>VS.</h3>
      </div>
      <div className="flex flex-col text-center">
        <img
          className="w-28 h-28 mb-4"
          src={`${Static.serverUrl}/api/images/profile/Vkorn.png`}
          alt="Opponent's picture"
        ></img>
        <p className="font-bold">VKorn</p>
      </div>
    </div>
  </>
  );
}

export default PastGameCard;
