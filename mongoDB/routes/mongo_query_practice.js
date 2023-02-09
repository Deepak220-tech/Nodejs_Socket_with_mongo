var express = require("express");
const mongo_controller = require("../controller/mongo_query_practice");

var router = express.Router();


router.get("/mongo/", mongo_controller.mongo_result);


module.exports = router;