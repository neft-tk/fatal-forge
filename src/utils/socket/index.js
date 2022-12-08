import io from 'socket.io-client'
import * as handlers from './handlers'

const ClientSocket = ()=>{
    const socket = io();
    //const lobby = handlers.Lobby(socket);
    const game = handlers.Game(socket);
    //const authentication = handlers.Auth(socket);

    return {
        //Lobby: lobby,
        //Authentication: authentication,
        Game: game,
        Emit: function(eventType, ...args){
            socket.emit(eventType, ...args)
        }
    }
}

const Socket = ClientSocket();

export default Socket;