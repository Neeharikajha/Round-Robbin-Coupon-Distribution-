const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    claimed: { type: Boolean, default: false },
    claimedBy: { type: String },
    claimedAt: { type: Date }
});

const Coupon = mongoose.model("Coupon", CouponSchema);

module.exports = Coupon;
