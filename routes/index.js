var express = require('express');
var router = express.Router();
const authCheck=require('../lib/auth_check.js');
/* GET home page. */

router.get('/',function (req, res, next) {
  const main = req.user
  console.log(req.user);
  res.render('index', {
    main
  });
});
router.get('/category/:category',authCheck, (req, res) => {const main = req.user
  if (!req.user)
    res.redirect('/auth');
  else {
    res.render('rooms', {
main
    })
  }
})
router.get('/category/:category/room/:room',authCheck ,(req, res) => {
  if (!req.user)
    res.redirect('/auth');
  else {
    res.render('index', {

    })
  }
})
module.exports = router;