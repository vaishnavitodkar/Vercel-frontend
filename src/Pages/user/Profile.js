import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import api from "../../api/axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setName(auth?.user?.name);
    setPhone(auth?.user?.phone);
    setAddress(auth?.user?.address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/api/v1/auth/profile", {
        name,
        password,
        phone,
        address,
      });

      setAuth({ ...auth, user: data.updatedUser });
      localStorage.setItem("auth", JSON.stringify({ ...auth, user: data.updatedUser }));
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <Layout title="Profile">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-8">
            <form onSubmit={handleSubmit} className="form-container">
              <h4>USER PROFILE</h4>

              <input className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="form-control mb-3" value={auth?.user?.email} disabled />
              <input className="form-control mb-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />
              <input className="form-control mb-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input className="form-control mb-3" value={address} onChange={(e) => setAddress(e.target.value)} />

              <button className="btn btn-primary">UPDATE</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
