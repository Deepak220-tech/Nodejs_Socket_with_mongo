const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const secret = process.env.JWT_KEY;

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	let token = "";
	if (!authHeader && !req.auth_optional) {
		return apiResponse.unauthorizedResponse(res, "Unauthorized Token");
	}
	if (authHeader) token = authHeader.split(' ');

	if (token?.length != 2 && !req.auth_optional) return apiResponse.unauthorizedResponse(res, "Unauthorized Token");

	jwt.verify(token[1], secret, (err, user) => {
		if (err) {
			if (!req.auth_optional)
				return apiResponse.unauthorizedResponse(res, "Unauthorized Token");
			else
				req.user = null;
		} else {
			req.user = user;
		}
		next();
	})
}
module.exports = authenticateToken;