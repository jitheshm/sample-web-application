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
  if (req.session.userStatus) {
    res.redirect('/')
  } else {
    if(req.session.signupError){
      var msg=req.session.errMsg
      req.session.signupError=false
      req.session.errMsg=""
    }
    res.render('user/signup', { title: 'Express' ,error:msg});
  }
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  signup(req.body).then((result) => {
    console.log(result);
    res.json({ success: true })
  }).catch((msg)=>{
    req.session.signupError=true
    req.session.errMsg=msg
    res.json({ success: false })
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
    
    res.render('user/login', { title: 'Express', error })
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
  
  res.render('user/index', { name: req.session.user })
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

module.exports = router;
