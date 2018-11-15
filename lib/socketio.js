passport_IO=require('./passport+socketio.js');
module.exports = (io) => {
    io.use(passport_IO);
    
    io.on('connection', (socket) => {
        socket.on('chat', (data) => {
            console.log(socket.request.user);
            console.log('chat received', socket.id, data)
            msg = {
                from: {
                    id: "id",
                    userid: "userid"
                },
                msg: data.msg
            }; //msg
            socket.emit('chat', msg);
        });
    })
}