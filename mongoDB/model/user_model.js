const { Schema } = require("mongoose");
var mongoose = require("mongoose");

var UsersSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true,match: /.+\@.+\..+/},
	phone: { type: Number, required: false,default:null},
	password: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model("users", UsersSchema);