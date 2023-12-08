var express = require('express');
const { login, getUsers } = require('../helpers/adminHelper/adminHelper');
const { signup } = require('../helpers/userHelper/userHelper');
var router = express.Router();

const verifyLogin = (req, res, next) => {
  if (req.session.adminStatus) {
    next()
  } else {
    res.redirect('/admin/login')
  }
}
router.get('/login', function (req, res, next) {
  if (req.session.adminError) {
    var error = "user name or password is incorrect"
    req.session.adminError = false
  }
  res.render('admin/login', { error })
});

router.post('/login', (req, res) => {
  login(req.body).then((result) => {
    if (result.success) {
      req.session.adminStatus = true
      res.redirect("/admin")
    } else {
      req.session.adminError = true
      res.redirect("/admin/login")
    }
  })

})

router.get("/", verifyLogin, (req, res) => {
  getUsers().then((users)=>{
    res.render('admin/index',{users,admin:true})
  })
  
})

router.get('/create',verifyLogin,(req,res)=>{
  res.render('admin/create',{admin:true})
})
router.post('/create',(req,res)=>{
  signup(req.body).then((result)=>{
    res.redirect('/admin')
  })
})

module.exports = router;
