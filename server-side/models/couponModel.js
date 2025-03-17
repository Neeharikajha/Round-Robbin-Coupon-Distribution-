const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    claimed: { type: Boolean, default: false },
    claimedBy: { type: String, default: null }, // Stores IP or session ID
    claimedAt: { type: Date, default: null }, // Timestamp of claim
    active: { type: Boolean, default: true } // Toggle coupon availability
});

// ✅ FIX: Pehle check kar ki model already exist to nahi karta
const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
