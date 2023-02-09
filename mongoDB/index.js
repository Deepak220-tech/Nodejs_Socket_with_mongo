const express =  require('express');
var app = express();
require('dotenv').config();

var apiResponse =  require('./helper/response');
var apiRouter = require("./routes/api");


var bodyParser = require('body-parser');
var cors =  require('cors')
 
//Connected with MongoDb
const db= require('./helper/db');
const MONGODB_URL = process.env.MONGO_URL;
db.connect(MONGODB_URL);



//app.use(cors());

//calling json 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api',apiRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
	return apiResponse.notFoundResponse(res, "API not found");
});

//Listen Port
const PORT =  process.env.PORT;
 app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
});
