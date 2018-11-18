const passport_IO=require('./passport+socketio.js');
const cookieParser = require('cookie-parser'),
passportSocketIo = require("passport.socketio"),
session_Option = require("./session.js");
module.exports = (server) => {

    const io= require('socket.io')(server);
    // const room = io.of('/')
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,       // the same middleware you registrer in express
        key:          session_Option.key,       // the name of the cookie where express/connect stores its session_id
        secret:       session_Option.secret,    // the session_secret to parse the cookie
        store:        session_Option.store,        // we NEED to use a sessionstore. no memorystore please
        // success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
        // fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
      }));
    io.on('connection', (socket) => {
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("qeqrewrqwerqwefdsfasdfas@@@@@@@@@@@@@@@@@@@@@@@@");
          

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