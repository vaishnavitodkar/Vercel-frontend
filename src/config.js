// src/config.js
export const BACKEND_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000" // your local backend
    : "https://e-commerce-web-backend-mdxk.onrender.com"; // deployed backend
