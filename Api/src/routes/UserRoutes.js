const express = require('express')
const { registerUser, confirm, getUsers, logInUser, banUser, unBanUser, setAdminRightsToUser, removeAdminRightsToUser, createAdmin } = require("../controlers/Users")
const router = express.Router();
router.use(express.json());

router.post("/", registerUser);
router.get("/", getUsers);
router.put("/setadmin", setAdminRightsToUser);
router.put("/removeadmin", removeAdminRightsToUser)
router.post("/createadmin", createAdmin);
router.get("/login/log", logInUser);
router.put("/ban/:id", banUser);
router.put("/unban/:id", unBanUser);
router.get('/confirm/:token', confirm);



module.exports = router;



