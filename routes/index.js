var express = require('express');
var router = express.Router();
/* GET home page. */
module.exports = (io) => {


  router.get('/', function (req, res, next) {
    const main = req.user
    console.log(req.user);
    res.render('index', {
      main
    });
  });
  
  io.on('connection', (socket) => {
    socket.on('chat', (data) => {
      
      console.log('chat received',socket.id, data) 
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

   return router;
}
