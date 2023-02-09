const { Schema } = require("mongoose");
var mongoose = require("mongoose");

var UsersSchema = new mongoose.Schema({
	user_id: { type: Schema.ObjectId, required: true },
	name: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model("products", UsersSchema);