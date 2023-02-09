const { Schema } = require("mongoose");
var mongoose = require("mongoose");

var UsersSchema = new mongoose.Schema({
	product_id: { type: Schema.ObjectId, required: true },
	order_details: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model("orders", UsersSchema);