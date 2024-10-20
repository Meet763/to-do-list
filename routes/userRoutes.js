const express = require('express')
const router = express.Router();
const {signupControl, loginControl} = require('../controller/userController')
const jwtAuthMiddleware = require('../middleware/auth')


router.post('/signup', signupControl);

router.post('/login', loginControl);


module.exports = router;