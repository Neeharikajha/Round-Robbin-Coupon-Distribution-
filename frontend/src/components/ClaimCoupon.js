import React, { useState } from "react";

const ClaimCoupon = () => {
  const [message, setMessage] = useState("");
  const dummyCoupon = "SAVE50"; // Dummy coupon code

  const handleClaimCoupon = () => {
    setMessage("Coupon claimed successfully!");
  };

  return (
    <div className="container mx-auto mt-10 p-5 text-center">
      <h2 className="text-2xl font-bold mb-4">Claim Your Coupon</h2>
      
      {message && <p className="text-green-600 font-semibold">{message}</p>}

      <div className="bg-gray-100 p-5 rounded shadow-md max-w-md mx-auto">
        <h3 className="text-xl font-semibold">Available Coupon: {dummyCoupon}</h3>
        <button 
          onClick={handleClaimCoupon} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Claim Coupon
        </button>
      </div>
    </div>
  );
};

export default ClaimCoupon;
