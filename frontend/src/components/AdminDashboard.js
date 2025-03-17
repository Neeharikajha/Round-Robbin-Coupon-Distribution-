import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [coupons, setCoupons] = useState([]);
    const [claimHistory, setClaimHistory] = useState([]);
    const [newCoupon, setNewCoupon] = useState("");
    const [couponActive, setCouponActive] = useState(true);

    useEffect(() => {
        axios.get("/admin/getCoupons").then((response) => setCoupons(response.data));
        axios.get("/admin/claimHistory").then((response) => setClaimHistory(response.data));
    }, []);

    const handleAddCoupon = () => {
        axios
            .post("/admin/addCoupon", { code: newCoupon, active: couponActive })
            .then((response) => setCoupons((prevCoupons) => [...prevCoupons, response.data.coupon]));
    };

    const toggleCoupon = (couponId, active) => {
        axios.put("/admin/toggleCoupon", { _id: couponId, active: !active }).then(() => {
            setCoupons((prevCoupons) =>
                prevCoupons.map((coupon) => (coupon._id === couponId ? { ...coupon, active: !active } : coupon))
            );
        });
    };

    return (
        <div>
            <h2>Add New Coupon</h2>
            <input
                type="text"
                placeholder="Coupon Code"
                value={newCoupon}
                onChange={(e) => setNewCoupon(e.target.value)}
            />
            <input
                type="checkbox"
                checked={couponActive}
                onChange={(e) => setCouponActive(e.target.checked)}
            />
            <button onClick={handleAddCoupon}>Add Coupon</button>

            <h2>Coupons</h2>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((coupon) => (
                        <tr key={coupon._id}>
                            <td>{coupon.code}</td>
                            <td>{coupon.active ? "Active" : "Inactive"}</td>
                            <td>
                                <button onClick={() => toggleCoupon(coupon._id, coupon.active)}>Toggle Availability</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Claim History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Coupon Code</th>
                        <th>Claimed By</th>
                        <th>Claimed At</th>
                    </tr>
                </thead>
                <tbody>
                    {claimHistory.map((claim) => (
                        <tr key={claim._id}>
                            <td>{claim.code}</td>
                            <td>{claim.claimedBy}</td>
                            <td>{claim.claimedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
