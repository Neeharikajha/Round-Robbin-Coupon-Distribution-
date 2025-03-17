


// import React, { useState, useEffect } from "react";
// import "../styles/User.css";

// const User = () => {
//   const [claimed, setClaimed] = useState(false);
//   const [message, setMessage] = useState("");
//   const [lastCoupon, setLastCoupon] = useState(null);
//   const [cooldown, setCooldown] = useState(0);

//   useEffect(() => {
//     const cooldownTime = localStorage.getItem("cooldown");
//     if (cooldownTime) {
//       const timeLeft = Math.max(0, cooldownTime - Date.now());
//       if (timeLeft > 0) {
//         setCooldown(timeLeft / 1000); // Convert to seconds
//         setClaimed(true);
//         setMessage(`You can claim another coupon in ${Math.ceil(timeLeft / 60000)} minutes.`);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (cooldown > 0) {
//       const timer = setInterval(() => {
//         setCooldown((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             setClaimed(false);
//             setMessage("");
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [cooldown]);

//   const handleClaim = () => {
//     if (claimed) return;

//     // Simulated API request to claim a coupon
//     const newCoupon = `COUPON-${Math.floor(Math.random() * 1000)}`;
//     setLastCoupon(newCoupon);
//     setClaimed(true);
//     setMessage("✅ Coupon claimed successfully!");

//     // Set cooldown (10 minutes)
//     const cooldownTime = Date.now() + 10 * 60 * 1000;
//     localStorage.setItem("cooldown", cooldownTime);
//     setCooldown(10 * 60);
//   };

//   return (
//     <div className="user-container">
//       <h2>🎉 Welcome to the User Dashboard 🎉</h2>

//       {/* Coupon Claim Section */}
//       <div className="coupon-card">
//         <h3>Claim Your Exclusive Coupon</h3>
//         {claimed ? (
//           <button className="claimed-btn" disabled>✅ Claimed</button>
//         ) : (
//           <button className="claim-btn" onClick={handleClaim}>Claim Coupon</button>
//         )}
//         <p className="message">{message}</p>
//       </div>

//       {/* Last Claimed Coupon */}
//       {lastCoupon && (
//         <div className="last-coupon">
//           <h4>Last Claimed Coupon:</h4>
//           <p className="coupon-code">{lastCoupon}</p>
//         </div>
//       )}

//       {/* Cooldown Timer */}
//       {cooldown > 0 && (
//         <p className="cooldown-timer">⏳ You can claim again in {Math.ceil(cooldown / 60)} minutes.</p>
//       )}

//     </div>
//   );
// };

// export default User;

import React, { useState, useEffect } from "react";
import "../styles/User.css";

const User = () => {
  const [claimed, setClaimed] = useState(false);
  const [message, setMessage] = useState("");
  const [lastCoupon, setLastCoupon] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState([
    { id: 1, code: "SAVE50", status: "Available" },
    { id: 2, code: "DISCOUNT20", status: "Available" },
    { id: 3, code: "FREESHIP", status: "Available" },
  ]);

  useEffect(() => {
    const cooldownTime = localStorage.getItem("cooldown");
    if (cooldownTime) {
      const timeLeft = Math.max(0, cooldownTime - Date.now());
      if (timeLeft > 0) {
        setCooldown(timeLeft / 1000);
        setClaimed(true);
        setMessage(`You can claim another coupon in ${Math.ceil(timeLeft / 60)} minutes.`);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setClaimed(false);
            setMessage("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleClaim = () => {
    if (claimed) return;

    const available = availableCoupons.find((coupon) => coupon.status === "Available");
    if (!available) {
      setMessage("❌ No more coupons available.");
      return;
    }

    const updatedCoupons = availableCoupons.map((coupon) =>
      coupon.id === available.id ? { ...coupon, status: "Claimed" } : coupon
    );

    setAvailableCoupons(updatedCoupons);
    setLastCoupon(available.code);
    setClaimed(true);
    setMessage("✅ Coupon claimed successfully!");

    const cooldownTime = Date.now() + 10 * 60 * 1000;
    localStorage.setItem("cooldown", cooldownTime);
    setCooldown(10 * 60);
  };

  return (
    <div className="user-container">
      <h2>🎉 Welcome to the Coupon Center 🎉</h2>

      {/* Coupon Claim Section */}
      <div className="coupon-card">
        <h3>Claim Your Exclusive Coupon</h3>
        {claimed ? (
          <button className="claimed-btn" disabled>✅ Claimed</button>
        ) : (
          <button className="claim-btn" onClick={handleClaim}>Claim Coupon</button>
        )}
        <p className="message">{message}</p>
      </div>

      {/* Available Coupons List */}
      <div className="coupon-list">
        <h3>🎁 Available Coupons</h3>
        {availableCoupons.map((coupon) => (
          <div key={coupon.id} className={`coupon-item ${coupon.status.toLowerCase()}`}>
            <p>{coupon.code} - <span>{coupon.status}</span></p>
          </div>
        ))}
      </div>

      {/* Last Claimed Coupon */}
      {lastCoupon && (
        <div className="last-coupon">
          <h4>Last Claimed Coupon:</h4>
          <p className="coupon-code">{lastCoupon}</p>
        </div>
      )}

      {/* Cooldown Timer */}
      {cooldown > 0 && (
        <p className="cooldown-timer">⏳ You can claim again in {Math.ceil(cooldown / 60)} minutes.</p>
      )}
    </div>
  );
};

export default User;

