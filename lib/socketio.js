const passport_IO = require('./passport+socketio.js'),
    passportSocketIo = require("passport.socketio")

module.exports = (server) => {

    const io = require('socket.io')(server);

    io.use(passportSocketIo.authorize(passport_IO));
    io.on('connection', (socket) => {

        socket.on('chat', (data) => {
            console.log('chat received', socket.request.user.id, data)
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
    io.on('connection', (socket) => {

        // socket.on('join', (room_ID) => {
        //     socket.join(room_ID);
        //     socket.to(room_ID).emit(`${socket.request.user.nickname}님이 들어오셨습니다.`);
        // });

        // socket.on('chat', (data) => {
        //     msg = {
        //         nickname: socket.request.user.nickname,
        //         msg: data.msg
        //     }; //msg
        //     socket.to(room_ID).emit('chat', msg);
        // });
        // socket.on('disconnect',()=>{
        //     socket.leave(room_ID);
        //     socket.to(room_ID).emit(`${socket.request.user.nickname}님이 퇴장하셨습니다.`);
        // })
    })



}
