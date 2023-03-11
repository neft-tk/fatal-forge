export const Chat = (socket) => {

    return {
        SendMessage(message) {
            socket.emit('send-message', message)
        },
        
        RecieveMessage() {
            socket.on("recieve-message", (message) => {
                console.log(message)
            })
        }
    }
}