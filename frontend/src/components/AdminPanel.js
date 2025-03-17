// import React, { useEffect, useState } from "react";
// import "../styles/AdminPanel.css"; // Add styles

// const AdminPanel = () => {
//   const [coupons, setCoupons] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3001/getAllCoupons")
//       .then((res) => res.json())
//       .then((data) => setCoupons(data))
//       .catch((err) => console.error("Error fetching coupons:", err));
//   }, []);

//   return (
//     <div className="admin-container">
//       <h2>Admin Panel - All Coupons</h2>
//       <table className="coupon-table">
//         <thead>
//           <tr>
//             <th>Coupon Code</th>
//             <th>Status</th>
//             <th>Claimed By</th>
//             <th>Claimed At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {coupons.map((coupon) => (
//             <tr key={coupon._id} className={coupon.claimed ? "claimed" : "unclaimed"}>
//               <td>{coupon.code}</td>
//               <td>{coupon.claimed ? "✅ Claimed" : "❌ Unclaimed"}</td>
//               <td>{coupon.claimedBy || "-"}</td>
//               <td>{coupon.claimedAt ? new Date(coupon.claimedAt).toLocaleString() : "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPanel;


import React, { useEffect, useState } from "react";
import "../styles/AdminPanel.css"; // Add styles

const AdminPanel = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/getCoupons") // ✅ Corrected API Endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch coupons");
        return res.json();
      })
      .then((data) => {
        console.log("Coupons Data from API:", data); // 👀 Debugging
        setCoupons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching coupons:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading coupons...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="admin-container">
      <h2>Admin Panel - All Coupons</h2>
      <table className="coupon-table">
        <thead>
          <tr>
            <th>Coupon Code</th>
            <th>Status</th>
            <th>Claimed By</th>
            <th>Claimed At</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id} className={coupon.claimed ? "claimed" : "unclaimed"}>
                <td>{coupon.code}</td>
                <td>{coupon.claimed ? "✅ Claimed" : "❌ Unclaimed"}</td>
                <td>{coupon.claimedBy || "-"}</td>
                <td>{coupon.claimedAt ? new Date(coupon.claimedAt).toLocaleString() : "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-coupons">No coupons available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
