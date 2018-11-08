const router = express.Router();
const sha = require('sha256');
const db = require('./db.js').sql; //only query import
module.exports = function (app) {

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    const passport = require('./passport.js')(app); //passport 사용

    router.post('/login', passport.authenticate('local'), function (request, response) {
        if (!request.user) {
            return response.status(400).redirect('/login');
        } else request.logIn(request.user, function (err) {
            console.log("logged in!");
            return response.redirect('/');
        });
    });
    router.post('/register', function (request, response) { //name= {id , password , email} 으로 받음 
        const post = request.body;
	console.log(post);
        console.log(post.id);
	console.log(post.password);
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()";
        var string_length = 15;
        var salt = '';
        db.query('SELECT id FROM auth_local WHERE id=?', post.id, function (err, result) {
            if (result[0]) {
                return response.status(400).json({
                    SERVER_RESPONSE: 0,
                    SERVER_MESSAGE: "Existed ID"
                }) // 이미 존재하는 아이디이면 다시 팅김
            } else {
                for (var i = 0; i < string_length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    salt += chars.substring(rnum, rnum + 1);
                }
                db.query("INSERT INTO auth_local values(?,?,?,?)", [post.id, sha(post.password + salt), post.email, salt], function (err) {
                    request.login(post, function (err) {
                        request.session.save(function () {
                            return response.redirect('/');
                        });
                    });
                });
            }
        });
    });
    router.get('/logout', function (request, response) {
        request.logout();
        response.redirect('/');
    });
    router.get('/kakao', passport.authenticate('kakao'));
    router.get('/kakao/callback', passport.authenticate('kakao'), function (request, response) {
        console.log(request);
        if (!request.user) {
            console.log("kakao_Wrong credentials");
            return response.status(400).json({
                SERVER_MESSAGE: "카카오 로그인 불가",
            }).redirect('/login');
        } else {
            console.log("kakao_logged in!");
            return response.redirect('/');
        }
    });
    return router;
};