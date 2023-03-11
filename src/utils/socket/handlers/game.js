export const Game = (socket) => {
    let id;

    return {
        CreateGame(gameId, size = 3) {
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
            socket.emit('game', {
                type: "joinGame",
                data: gameId
            })
            id = gameId;
        },
        SetReady() {
            socket.emit('game', {
                type: 'isReady',
                gameId: id
            })
        },
        PickColor(color) {
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
                    if (callback) {
                        callback(data.data);
                    }
                }
            })
        },
        OnStart(callback) {
            socket.on('game', data => {
                if (data.type == 'startTurn') {
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