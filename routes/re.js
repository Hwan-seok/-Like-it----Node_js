var express = require('express');
const router = express.Router();
module.exports = (app) => {

    router.get('/',(req,res)=>{
        res.render('auth', {register:true});

    })
    return router;
};