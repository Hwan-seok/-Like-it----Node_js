var express = require('express');
var router = express.Router();
/* GET home page. */
  router.get('/', function (req, res, next) {
    const main = req.user
    console.log(req.user);
    res.render('index', {
      main
    });
  });
  
  module.exports= router;