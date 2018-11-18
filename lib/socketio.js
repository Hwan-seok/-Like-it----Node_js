const passport_IO=require('./passport+socketio.js'),
passportSocketIo = require("passport.socketio")

module.exports = (server) => {

    const io= require('socket.io')(server);
    // const room = io.of('/')
    io.use(passportSocketIo.authorize(passport_IO));
    io.on('connection', (socket) => {
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(socket.request.user);

        // socket.on('chat', (data) => {
        //     console.log(socket.request.user);
        //     console.log('chat received', socket.id, data)
        //     msg = {
        //         from: {
        //             id: "id",
        //             userid: "userid"
        //         },
        //         msg: data.msg
        //     }; //msg
        //     socket.emit('chat', msg);
        // });
    })
}