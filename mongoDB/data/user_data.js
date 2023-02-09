const user_model = require('../model/user_model');

//Register user API
 exports.register_user = async(user_data)=>{
   const input_data = user_model(user_data);
   return input_data.save();
 }
 //get user details by email

 exports.get_user  = async(email)=>{
    return await user_model.find({email:email});
 }