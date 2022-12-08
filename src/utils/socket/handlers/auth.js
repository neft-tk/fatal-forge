const Auth = (socket)=>{
    return {
        RegisterSocket(userInfo){
            socket.emit('register', userInfo);
        },
        UnregisterSocket(){
            socket.emit('unregister');
        }
    }
}