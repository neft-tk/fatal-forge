import io from 'socket.io-client'
import * as handlers from './handlers'

const ClientSocket = ()=>{
    const socket = io('http://localhost:3001');
    //const lobby = handlers.Lobby(socket);
    const game = handlers.Game(socket);
    const auth = handlers.Auth(socket);

    return {
        //Lobby: lobby,
        Auth: auth,
        Game: game,
        Emit: function(eventType, ...args){
            socket.emit(eventType, ...args)
        }
    }
}

const Socket = ClientSocket();

export default Socket;