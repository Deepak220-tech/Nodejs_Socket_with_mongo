const user_data = require('../data/user_data');
const user_auth = require('../middleware/user_auth');
const bcrypt = require('bcrypt');

//Register User Details
exports.register_user = async (data) => {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    //console.log(hash)
    return await user_data.register_user(data);
}

//login user  

exports.login_user = async (body) => {
    const user_details = await user_data.get_user(body.email);
    if (user_details.length > 0) {
        //check password is wrong or not 
        const bcrypt_res = await bcrypt.compare(body.password, user_details[0].password);
        if (bcrypt_res) {
            let payload =   user_details[0].toJSON();
            const token  = await user_auth.login_auth(payload);
            console.log(token);
            payload.token =  token;
            return{
                status:true,
                data:payload
            }


        } else {
            return {
                status: false,
                data: "Password not matched !"
            }
        }
    }else{
        return{
            status:false,
            data:"User Not Exist!"
        }
    }

}