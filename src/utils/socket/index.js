import io from 'socket.io-client'
import * as handlers from './handlers'
import Static from '../staticHelper'
const ClientSocket = ()=>{
    const socket = io(`${Static.serverUrl}`, { transports: ['websocket', 'polling', 'flashsocket'] });
    //const lobby = handlers.Lobby(socket);
    const game = handlers.Game(socket);
    const auth = handlers.Auth(socket);

    return {
        //Lobby: lobby,
        Auth: auth,
        Game: game,
        Emit: function(eventType, ...args){
            socket.emit(eventType, ...args)
        },
        IO : socket
    }
}

const Socket = ClientSocket();

export default Socket;
