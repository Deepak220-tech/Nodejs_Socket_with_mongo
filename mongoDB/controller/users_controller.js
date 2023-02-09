const user_service =  require('../services/user_service');
const { body, sanitizeBody, validationResult } = require("express-validator");
const apiResponse = require('../helper/response');

// Register User 
exports.register_user = [
    //Express validation 
    body("name").isLength({ min: 1 }).trim().withMessage("Name must be specified.")
        .isAlphanumeric().withMessage("Name has non-alphanumeric characters."),
    body("email").isEmail().trim().withMessage("Email must be specified."),
    body('phone').isLength({min:10,max:10}).trim().withMessage("Phone must be 10 digit."),    
    body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
   async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Display sanitized values/errors messages.
            return apiResponse.validationErrorWithData(res, "Validation Error", errors.array());
        } else {
             await user_service.register_user(req.body).then((response)=>{
             return apiResponse.successResponseWithData(res,"Data Saved SuccessFully !",response);
             });
        }
}]

//user login

// Register User 
exports.login_user = [
    //Express validation 
    body("email").isEmail().trim().withMessage("Email must be specified."),    
    body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
   async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Display sanitized values/errors messages.
            return apiResponse.validationErrorWithData(res, "Validation Error", errors.array());
        } else {
             await user_service.login_user(req.body).then((response)=>{
                console.log(response)
                if(response.status == false)
                   return apiResponse.ErrorResponse(res,response.data);
                return apiResponse.successResponseWithData(res,"User login SuccessFully !",response);
             });
        }
}]