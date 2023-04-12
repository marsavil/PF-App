const express = require('express')
const { registerUser, confirm, getUsers, getUsersData } = require("../controlers/Users")
const router = express.Router();
router.use(express.json());

router.post("/", registerUser);
router.get("/", getUsers);
router.get("/data", getUsersData);
router.get('/confirm/:token', confirm);


module.exports = router;



