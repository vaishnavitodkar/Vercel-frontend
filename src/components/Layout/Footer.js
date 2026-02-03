// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <div className="footer">
//       <h1 className="text-center">All rights reserved &copy; Group GC-10</h1>
//       <p className="text-center mt-3">
//         <Link to="/about">About </Link>|<Link to="/contact"> Contact </Link>|
//         <Link to="/policy"> Privacy Policy </Link>
//       </p>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#222",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "30px",
          textAlign: "center",
        }}
      >
        {/* Brand Info */}
        <div>
          <h2 style={{ color: "#ff6600", marginBottom: "15px" }}>HaveAriz</h2>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
            Your one-stop shop for fashion, electronics, and everything in
            between. Bringing <strong>quality</strong> and{" "}
            <strong>convenience</strong> to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ marginBottom: "15px" }}>Quick Links</h4>
          <p>
            <Link
              to="/about"
              style={{ color: "#bbb", textDecoration: "none" }}
            >
              About Us
            </Link>
          </p>
          <p>
            <Link
              to="/contact"
              style={{ color: "#bbb", textDecoration: "none" }}
            >
              Contact
            </Link>
          </p>
          <p>
            <Link
              to="/policy"
              style={{ color: "#bbb", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Customer Support */}
        <div>
          <h4 style={{ marginBottom: "15px" }}>Customer Support</h4>
          <p>Email: support@haveariz.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 style={{ marginBottom: "15px" }}>Follow Us</h4>
          <p style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#bbb", fontSize: "1.4rem" }}
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#bbb", fontSize: "1.4rem" }}
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#bbb", fontSize: "1.4rem" }}
            >
              <i className="fab fa-twitter"></i>
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <hr style={{ borderColor: "#444", margin: "30px 0" }} />
      <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#aaa" }}>
        © {new Date().getFullYear()} Group GC-10 | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;

