const express = require('express');
const { userRegister, userLogin } = require('./authCntrl');
const { authentic } = require('./authenticate');
const router = express.Router();

router.route('/register/').post(userRegister);
router.route('/login/').post(authentic,userLogin)

module.exports = router