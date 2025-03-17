// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3001"; // Your backend URL

// Get all available coupons
export const getAvailableCoupons = async () => {
  try {
    const response = await axios.get(`${API_URL}/getCoupons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};

// Claim a coupon
export const claimCoupon = async () => {
  try {
    const response = await axios.post(`${API_URL}/claimCoupon`);
    return response.data;
  } catch (error) {
    console.error("Error claiming coupon:", error);
    throw error;
  }
};
