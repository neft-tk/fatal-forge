export const Auth = (socket) => {

    return {
        RegisterSocket(userInfo) {
            socket.emit('register', userInfo);
            socket.userInfo = userInfo;
        },
        
        UnregisterSocket() {
            socket.emit('unregister');
        }
    }
}