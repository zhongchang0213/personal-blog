const express = require('express');

const checkUser = require('../middlewares/checkUser');
const register = require('../controller/user/register');
const login = require('../controller/user/login');
const loginOut = require('../controller/user/loginOut');
const changePwd = require('../controller/user/changePwd');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/loginOut', loginOut);
router.post('/changePwd', checkUser, changePwd);

module.exports = router;
