var express = require('express');
const { signup, login } = require('../helpers/userHelper/userHelper');

var router = express.Router();

const verifyLogin = (req, res, next) => {
  if (req.session.userStatus) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/signup', function (req, res, next) {
  res.set('Cache-Control', 'no-store')
  res.render('signup', { title: 'Express' });
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  signup(req.body).then((result) => {
    console.log(result);
    res.json({ success: true })
  })


})
router.get('/login', (req, res) => {
  if (req.session.userStatus) {
    res.redirect('/')
  }
  else {
    if (req.session.userLoginError) {
      var error = "email or password is incorrect"
      req.session.userLoginError = false
    }
    res.set('Cache-Control', 'no-store')
    res.render('login', { title: 'Express', error })
  }
})


router.post('/login', (req, res) => {
  console.log(req.body);
  login(req.body).then((result) => {
    if (result.success) {
      req.session.user = result.data.name
      req.session.userStatus = result.success
      res.redirect('/')
    } else {
      req.session.userLoginError = true
      res.redirect('/login')
    }
  })
})
router.get('/', verifyLogin, (req, res) => {
  res.set('Cache-Control', 'no-store')
  res.render('index', { name: req.session.user })
})

module.exports = router;
