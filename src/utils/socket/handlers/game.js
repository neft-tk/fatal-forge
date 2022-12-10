export const Game = (socket)=>{
    let id;

    return {
        CreateGame(gameId){
            console.log(`created ${gameId}`)
            socket.emit('game', {
                type: "createGame",
                data: gameId
            });
            id = gameId;
        },

        JoinGame(gameId){
            console.log(`joined ${gameId}`)
            socket.emit('game', {
                type: "joinGame",
                data: gameId
            })
            id = gameId;
        },
        SetReady(){
            console.log(`emitting ready`);
            socket.emit('game',{
                type:'isReady',
                gameId: id
            })
        },
        PickColor(color){
            console.log('emitting color pick');
            socket.emit('game', {
                type:"pickColor",
                gameId: id,
                data: color
                }
            )
        },
        OnPlayerUpdate(callback){
            socket.on('game', data=>{
                if (data.type == 'playerUpdate'){
                    if(callback){
                        console.log('player state changed', data)
                        callback(data.data)
                    }
                }
            })
        }
    }
}