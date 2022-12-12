import Static from '../utils/staticHelper'

function PastGameCard() {
  return (
    <div className="flex m-4 p-4 justify-center items-center">
      <img 
        className="w-28 h-28"
        src={`${Static.serverUrl}/api/images/profile/Vkorn.png`}
        alt="Opponent's picture"
      ></img>
      <p className="ml-4">VKorn</p>
    </div>
  )
}

export default PastGameCard