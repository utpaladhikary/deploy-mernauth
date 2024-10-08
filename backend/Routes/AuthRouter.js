const {signUp, login} = require('../Controllers/AuthController');
const { signUpValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/signup', signUpValidation, signUp);
router.post('/login',loginValidation, login);

module.exports = router;