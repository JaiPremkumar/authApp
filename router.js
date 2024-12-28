const express = require('express');
const { userRegister, userLogin, myProfile, getAllUser } = require('./authCntrl');
const { authentic,authorizedRoles } = require('./authenticate');
const router = express.Router();

router.route('/register/').post(userRegister);
router.route('/login/').post(authentic,userLogin)
router.route('/myprofile').get(authentic,myProfile)
router.route('/alluser').get(getAllUser)

module.exports = router