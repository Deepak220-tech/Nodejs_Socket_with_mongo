var mongoose = require('mongoose');
var colors = require('colors');
exports.connect = async(MONGODB_URL)=>{
    await mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URL,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log(`Data base Connected With ${MONGODB_URL}`.green));
    
}
