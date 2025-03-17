import React, { useState } from "react";

const CouponList = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: "SAVE10", status: "Available" },
    { id: 2, code: "DISCOUNT20", status: "Claimed" },
    { id: 3, code: "OFFER30", status: "Available" },
  ]);

  return (
    <div className="coupon-admin">
      <h3>Manage Coupons</h3>
      <ul>
        {coupons.map((coupon) => (
          <li key={coupon.id} className={`coupon-item ${coupon.status.toLowerCase()}`}>
            {coupon.code} - {coupon.status}
          </li>
        ))}
      </ul>
      <button className="add-coupon">+ Add New Coupon</button>
    </div>
  );
};

export default CouponList;
