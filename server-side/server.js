
require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const adminRoutes = require("./routes/adminRoutes"); // Import routes
const Coupon = require("./models/couponModel");

const rateLimitMap = new Map(); // Store IP addresses and claim timestamps

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/couponDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const SECRET_KEY = process.env.SECRET_KEY || "your_super_secret_key"; // Get from .env

// ✅ Apply admin routes BEFORE authentication middleware
app.use("/admin", adminRoutes); 

// ✅ Admin Authentication Middleware (EXCLUDES /admin/login & /admin/register)
const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(403).json({ message: "Access denied!" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
        req.adminId = decoded.adminId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token!" });
    }
};

// ✅ Apply authentication only to protected admin routes
app.use("/admin/protected", authenticateAdmin);

// ✅ API: Get all unclaimed coupons
app.get("/getCoupons", async (req, res) => {
    try {
        const coupons = await Coupon.find({ claimed: false });
        res.json(coupons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API: Claim a coupon with IP tracking
app.post("/claimCoupon", async (req, res) => {
    try {
        // const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userIP = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

        const sessionID = req.cookies.sessionID || "guest_" + Math.random().toString(36).substr(2, 9);

        const cooldownPeriod = 60 * 60 * 1000; // 1 hour cooldown

        if (rateLimitMap.has(userIP) && Date.now() - rateLimitMap.get(userIP) < cooldownPeriod) {
            return res.status(400).json({ message: "You have already claimed a coupon recently!" });
        }

        // Find the first unclaimed and active coupon
        const coupon = await Coupon.findOne({ claimed: false, active: true });

        if (!coupon) {
            return res.status(404).json({ message: "No active coupons available!" });
        }

        // Mark coupon as claimed
        coupon.claimed = true;
        coupon.claimedBy = userIP || sessionID;
        coupon.claimedAt = new Date();
        await coupon.save();

        // Store claim time for abuse prevention
        rateLimitMap.set(userIP, Date.now());

        res.json({ message: "Coupon claimed successfully!", coupon });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API: Add a new coupon (POST)
app.post("/addCoupon", async (req, res) => {
    try {
        const { code, active } = req.body; // You can send the coupon code and active status in the request body
        const existingCoupon = await Coupon.findOne({ code });

        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon already exists!" });
        }

        const newCoupon = new Coupon({
            code,
            active
        });

        await newCoupon.save();
        res.json({ message: "Coupon added successfully!", coupon: newCoupon });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ API: Get all coupons (both available and unavailable)
app.get("/getAllCoupons", async (req, res) => {
    try {
        const coupons = await Coupon.find(); // Fetch all coupons without filtering
        res.json(coupons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ Start Server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
