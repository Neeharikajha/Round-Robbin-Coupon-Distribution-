// import React from "react";

// const Admin = () => {
//   return <h2 style={{ textAlign: "center" }}>Welcome to the Admin Dashboard</h2>;
// };

// export default Admin;


import React, { useState } from "react";
import CouponList from "./CouponList";
import "./../styles/Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <CouponList />
    </div>
  );
};

export default Admin;
