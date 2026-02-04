import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (data?.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  return (
    <Layout title="Register">
      <div className="form-container" style={{ minHeight: "75vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER</h4>

          <input className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <input className="form-control mb-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input className="form-control mb-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input className="form-control mb-3" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
          <input className="form-control mb-3" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
          <input className="form-control mb-3" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Favorite sport?" required />

          <button className="btn btn-primary">REGISTER</button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
