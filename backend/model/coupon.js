const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    coupon: {
        type: String,
        required: [true, "Please enter the coupon code"],
        unique: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Coupon", couponSchema);
