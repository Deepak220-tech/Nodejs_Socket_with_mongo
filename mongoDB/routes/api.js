var express = require("express");
var app = express();

var userRouter = require("./users_routes");
var mongoRouter =  require('./mongo_query_practice');

app.use("/user/", userRouter);
app.use("/mongo/",mongoRouter);
module.exports = app;

