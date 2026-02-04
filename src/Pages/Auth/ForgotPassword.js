import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/api/v1/auth/forgot-password",
        { email, newPassword, answer }
      );

      if (data?.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Reset failed");
    }
  };

  return (
    <Layout title="Forgot Password">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4>RESET PASSWORD</h4>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Your favorite sport?"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary">RESET</button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
