// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav style={styles.navbar}>
//       <h2 style={styles.logo}>MyApp</h2>
//       <div>
//         <Link to="/" style={styles.link}>Home</Link>
//         <Link to="/admin" style={styles.link}>Admin</Link>
//         <Link to="/user" style={styles.link}>User</Link>
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     background: "#333",
//     color: "white",
//   },
//   logo: {
//     margin: 0,
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     marginLeft: "15px",
//     fontSize: "16px",
//   }
// };

// export default Navbar;


import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Importing CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">MyApp</h2>
      <div>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
        <Link to="/user" className="nav-link">User</Link>
      </div>
    </nav>
  );
};

export default Navbar;

