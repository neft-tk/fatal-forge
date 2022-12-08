export const Game = (socket)=>{
    return {
        CreateGame(gameId){
            console.log(`created ${gameId}`)
            socket.emit('game', {
                type: "createGame",
                data: gameId
            });
        },

        JoinGame(gameId){
            console.log(`joined ${gameId}`)
            socket.emit('game', {
                type: "joinGame",
                data: gameId
            })
        }
    }
}