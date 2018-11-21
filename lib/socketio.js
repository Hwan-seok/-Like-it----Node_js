const passport_IO = require('./passport+socketio.js'),
    passportSocketIo = require("passport.socketio"),
    db = require('../lib/db.js');

module.exports = (server, app) => {

    const io = require('socket.io')(server);

    io.use(passportSocketIo.authorize(passport_IO));
    app.set('io', io);
    const chat = io.of('/chat');

    chat.on('connection', (socket) => {
        let room;

        socket.on("connection",(roomnum)=>{
            room=roomnum;
            console.log(socket.request.user.nickname, room ,'번방 입장');
            socket.join(room);
            socket.to(room).emit(`${socket.request.user.nickname}님이 들어오셨습니다.`);
        })

        socket.on('chat_sended_to_server', (data) => {
            console.log('chat received', socket.request.user.id, data);
            const msg={};
            msg.time = socket.handshake.time.slice(0,24);
            msg.sended=socket.request.user.id;
            msg.sended_Nicknamee=socket.request.user.nickname;
            msg.profile_image= socket.request.user.profile_image;
            msg.description= data.msg;
            
            const sql='INSERT INTO chat (room,chat) VALUES (?,?)'
            db.query(sql,[room,`${JSON.stringify(msg)}`],(err,result)=>{//채팅한 말 객체들의 배열 [{"sended":"YOUT","sended_NickName":"YOU" , time : "now" , description : "lala"}, ... ]
                
            })
            socket.to(room).emit('chat_sended_to_client', msg);
        });

        socket.on('disconnect',()=>{
                socket.leave(room);
                socket.to(room).emit(`${socket.request.user.nickname}님이 퇴장하셨습니다.`);
            })
    })
    io.on('connection', (socket) => {

        // socket.on('join', (room_ID) => {
        //     socket.join(room_ID);
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
