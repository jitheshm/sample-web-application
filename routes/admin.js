var express = require('express');
const { login, getUsers, findUser, updateUser, deleteUser } = require('../helpers/adminHelper/adminHelper');
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
  if(req.session.adminStatus){
    res.redirect('/admin')
  }else{
    if (req.session.adminError) {
      var error = "user name or password is incorrect"
      req.session.adminError = false
    }
    res.render('admin/login', { error })
  }
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
  if(req.session.createuserError){
    var msg=req.session.createErrmsg
    req.session.createuserError=false
    req.session.createErrmsg=""
  }
  res.render('admin/create',{admin:true,error:msg})
})
router.post('/create',(req,res)=>{
  signup(req.body).then((result)=>{
    res.redirect('/admin')
  }).catch((msg)=>{
    req.session.createuserError=true
    req.session.createErrmsg=msg
    res.redirect('/admin/create')
  })
})
router.get('/edit/:id',verifyLogin,(req,res)=>{
  // console.log(req.params);
  findUser(req.params.id).then((user)=>{
    console.log(user);
    res.render('admin/edit',{user,admin:true})
  })
 
})

router.post('/update',verifyLogin,(req,res)=>{
  console.log(req.body);
  updateUser(req.body).then(()=>{
    
    res.redirect('/admin')
  })
})

router.get('/delete',verifyLogin,(req,res)=>{
  deleteUser(req.query.id).then(()=>{
    res.redirect('/admin')
  })
})

router.get('/logout',verifyLogin,(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/admin/login')
  })
})

module.exports = router;
