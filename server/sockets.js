class Sockets {
    constructor(io){
        this.io = io
        
    }

    socketEvents(){
        this.io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('solicitar-ticket',(data, callback)=>{
                
                callback(nuevoTicket)
            });
            socket.on('disconnect', () => {    console.log('user disconnected');  });
        })
    }
}

module.exports = Sockets