var jwt = require('jsonwebtoken');

exports.login_auth =  async(payload)=>{
    const screat_key = process.env.JWT_KEY;
    var token = jwt.sign(payload, screat_key);
    return token;
}
