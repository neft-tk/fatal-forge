export const Game = (socket) => {
    let id;

    return {
        CreateGame(gameId, size = 3) {
            console.log(`created ${gameId}`)
            socket.emit('game', {
                type: "createGame",
                data: {
                    id: gameId,
                    size: size
                }
            });
            id = gameId;
        },

        JoinGame(gameId) {
            console.log(`joined ${gameId}`)
            socket.emit('game', {
                type: "joinGame",
                data: gameId
            })
            id = gameId;
        },
        SetReady() {
            console.log(`emitting ready`);
            socket.emit('game', {
                type: 'isReady',
                gameId: id
            })
        },
        PickColor(color) {
            console.log('emitting color pick');
            socket.emit('game', {
                type: "pickColor",
                gameId: id,
                data: color
            }
            )
        },
        OnPlayerUpdate(callback) {
            socket.on('game', data => {
                if (data.type == 'playerUpdate') {
                    if (callback) {
                        console.log('player(s) state changed', data)
                        callback(data.data)
                    }
                }
            })
        },
        PlaceCard(data) {
            socket.emit('game', {
                type: 'placeCard',
                gameId: id,
                data: data
            })
        },
        OnPlacedCard(callback) {
            socket.on('game', data => {
                if (data.type == 'placeCard') {
                    console.log('player placed a card', data.data);
                    if (callback) {
                        callback(data.data);
                    }
                }
            })
        },
        OnStart(callback) {
            socket.on('game', data => {
                if (data.type == 'startTurn') {
                    console.log(`all players joined, rolled to start: ${data.data}`)
                    if (callback) {
                        callback(data.data);
                    }
                }
            })
        },
        Leave(){
            socket.emit('game', {
                type:'leave',
                gameId: id
            })
        }
    }
}