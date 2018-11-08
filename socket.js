const WebSocket = require('ws')

module.exports = (server) => {
  const wss = new WebSocket.Server({server});

    wss.on('connection', (ws,req) => { // 웹소켓 연결 시
      const ip= req.headers['x-forwarded-for'] || req.connection.remoteAddress; //클라이언트의 ip를 알아내는 방법
      console.log('새로운 클라이언트 접속',ip)
      ws.on('message', (message) => { // 클라이언트에서 newScoreToServer 이벤트 요청 시
        console.log(message);
      });
      ws.on('close', ()=>{
        console.log('접속 해제',ip);
        clearInterval(ws.interval);
      });
      ws.on('error',(err)=>{
        console.error(err);
      });
      const interval = setInterval(()=>{
        if(ws.readyState===ws.OPEN){
          ws.send('서버->클라이언트 메시지 전송');
        }
      },3000);
      ws.interval=interval;
    });
  };