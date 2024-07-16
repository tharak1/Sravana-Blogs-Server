const express = require("express");
const { getUsers, getUser, createUser, loginUser, updateUser } = require("../controllers/userController");
const validateToken = require("../middleware");

const router = express.Router();

router.route('/').get(getUsers);
router.route('/getuser').get(validateToken,getUser);
router.route('/').post(createUser);
router.route('/login').post(loginUser);
router.route('/setCreator').get(validateToken,updateUser);


module.exports = router;