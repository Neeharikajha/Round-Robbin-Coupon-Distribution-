// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/adminModel");
// require("dotenv").config();

// const router = express.Router();
// const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// // ✅ Admin Registration (No Authentication Needed)
// router.post("/register", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const existingAdmin = await Admin.findOne({ username });
//         if (existingAdmin) return res.status(400).json({ message: "Admin already exists!" });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newAdmin = new Admin({ username, password: hashedPassword });
//         await newAdmin.save();

//         res.json({ message: "Admin registered successfully!" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.get("/claimHistory", async (req, res) => {
//     try {
//         const history = await Coupon.find({ claimed: true }).select("code claimedBy claimedAt");
//         res.json(history);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.put("/toggleCoupon", async (req, res) => {
//     try {
//         const { _id, active } = req.body;
//         const coupon = await Coupon.findByIdAndUpdate(_id, { active }, { new: true });

//         if (!coupon) return res.status(404).json({ message: "Coupon not found" });

//         res.json({ message: `Coupon ${active ? "enabled" : "disabled"} successfully!`, coupon });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });



// // ✅ Admin Login (No Authentication Needed)
// router.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const admin = await Admin.findOne({ username });

//         if (!admin || !(await bcrypt.compare(password, admin.password))) {
//             return res.status(401).json({ message: "Invalid credentials!" });
//         }

//         const token = jwt.sign({ adminId: admin._id }, SECRET_KEY, { expiresIn: "2h" });
//         res.json({ message: "Login successful!", token });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ✅ Protected Route (Requires Authentication)
// router.get("/protected", async (req, res) => {
//     res.json({ message: "Welcome, Admin! You are authenticated." });
// });

// module.exports = router;


const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Admin model
const Coupon = require("../models/Coupon"); // Coupon model

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

// Admin Register
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            username,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        res.status(400).json({ message: "Error registering admin", error });
    }
});

// Admin Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ message: "Admin not found!" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: "Error logging in", error });
    }
});

// Get Coupons
router.get("/getCoupons", async (req, res) => {
    try {
        const coupons = await Coupon.find({ active: true }); // Only active coupons
        res.json(coupons);
    } catch (error) {
        res.status(400).json({ message: "Error fetching coupons", error });
    }
});

// Add Coupon
router.post("/addCoupon", async (req, res) => {
    const { code, active } = req.body;
    try {
        const newCoupon = new Coupon({ code, active });
        await newCoupon.save();
        res.status(201).json({ coupon: newCoupon });
    } catch (error) {
        res.status(400).json({ message: "Error adding coupon", error });
    }
});

// Toggle Coupon Availability
router.put("/toggleCoupon", async (req, res) => {
    const { _id, active } = req.body;
    try {
        const coupon = await Coupon.findByIdAndUpdate(_id, { active }, { new: true });
        res.json(coupon);
    } catch (error) {
        res.status(400).json({ message: "Error toggling coupon", error });
    }
});

// Get Claim History
router.get("/claimHistory", async (req, res) => {
    try {
        const claimHistory = await Coupon.find({ claimed: true }); // Get claimed coupons
        res.json(claimHistory);
    } catch (error) {
        res.status(400).json({ message: "Error fetching claim history", error });
    }
});

module.exports = router;
