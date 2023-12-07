var express = require('express');
const { signup } = require('../helpers/userHelper/userHelper');

var router = express.Router();

/* GET home page. */
router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  signup(req.body).then((result) => {
    console.log(result);
    res.json({success:true})
  })


})
router.get('/login', (req, res) => {
  res.render('login', { title: 'Express' })
})
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router;
