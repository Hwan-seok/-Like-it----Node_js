var express = require('express');
var router = express.Router();
const authCheck = require('../lib/auth_check.js');
const db = require('../lib/db.js');
/* GET home page. */

router.get('/', function (req, res, next) {

  res.render('index', {
    main: req.user
  });
});
router.get('/contents/:category/page/:page', authCheck, (req, res) => {

  const sql = "SELECT num,name,owner,likes FROM rooms WHERE contents=? LIMIT ?,?";
  const category = req.params.category;
  const page = (req.params.page * 10) - 10; // 파라미터 page가 1이면 0 ,2이면 10  
  const pageLimit = 10;
  let page_num = 0;

  //page 부터 10개(pagelimit)씩 검색하여 렌더링함  
  db.query(sql, [category, page, pageLimit], (err, rooms) => {

    db.query(sql, [category, 0, 10000], (err, pages) => {
      page_num = Math.floor(pages.length / 10) + 1 //페이지의 개수 파악

      res.render('rooms', {
        main: req.user,
        category: req.params.category,
        rooms,
        current_page: req.params.page *= 1, //string -> int 형변환
        page_num
      });
    })
  })
})
router.get('/contents/:category/room/:room', authCheck, (req, res) => {
  const sql = "Select * From rooms left JOIN participants ON rooms.num = participants.room WHERE rooms.num=?"; //participants
  const sql2 = "Select * From rooms left join chat on rooms.num=chat.room WHERE rooms.num=?"; //chat
  db.query(sql, [req.params.room], (err, room_Info) => {
    db.query(sql2, [req.params.room], (err, chats) => {

      let people = [];
      for (let i = 0; i < room_Info.length; i++)
        people[i] = JSON.parse(room_Info[i].people); //방에 참가하고 있는 인원들 객체 배열 [{ id:1123 ,img:123} , ... ]

      let chat = [];
      for (let i = 0; i < chats.length; i++)
        chat[i] = JSON.parse(chats[i].chat); //채팅한 말 객체들의 배열 [{sended:"YOU" , time : "now" , description : "lala"}, ... ]

      // for (let i = 0; i < people.length; i++) {
      //   db.query("SELECT * FROM auth_kakao WHERE id = ?", people[i], (err, user) => {
      console.log(people,chat)
      res.render('chat', {
        main: req.user,
        chat,
        people
      })

    })
  })
})



module.exports = router;