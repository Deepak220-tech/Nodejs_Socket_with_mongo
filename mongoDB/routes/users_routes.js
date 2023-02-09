var express = require("express");
const users_controller = require("../controller/users_controller");

var router = express.Router();


router.post("/save-user/", users_controller.register_user);
router.get("/login/",users_controller.login_user);


module.exports = router;