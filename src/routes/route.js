const express = require('express');
const userController = require('../controllers/userController')

const Midd = require('../middleware/authMiddleware')


const router = express.Router();

router.post("/user", userController.createUser)
router.get("/user", Midd.middleWare,userController.getUser)
router.post("/login", userController.login)   
module.exports = router;

