import React, { useState, useEffect } from "react";

const UserPanel = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available coupons for users
    fetch("http://localhost:3001/getCoupons")
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
        setLoading(false);
      });
  }, []);

  const handleClaimCoupon = (couponId) => {
    fetch("http://localhost:3001/claimCoupon", {
      method: "POST",
      body: JSON.stringify({ couponId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error claiming coupon:", error);
      });
  };

  return (
    <div>
      <h1>User Panel</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Status</th>
              <th>Claim</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.active ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={() => handleClaimCoupon(coupon._id)}>
                    Claim
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserPanel;
