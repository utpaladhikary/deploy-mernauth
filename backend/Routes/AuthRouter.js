const {signUp, login} = require('../Controllers/AuthController');
const { signUpValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/ping', (req,res)=>{
  res.send('I am working buddy !!!')
});

router.post('/signup', signUpValidation, signUp);
router.post('/login',loginValidation, login);

module.exports = router;