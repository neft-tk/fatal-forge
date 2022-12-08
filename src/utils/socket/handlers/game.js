const Game = (socket)=>{
    return {
        CreateGame(gameId){
            socket.emit('createGame', gameId);
        }
    }
}