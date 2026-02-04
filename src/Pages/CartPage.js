import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const navigate = useNavigate();

  const getToken = async () => {
    const { data } = await api.get("/api/v1/product/braintree/token");
    setClientToken(data.clientToken);
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      await api.post("/api/v1/product/braintree/payment", { nonce, cart });

      setCart([]);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
      toast.success("Payment successful");
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  return (
    <Layout>
      {/* UI stays same — backend calls fixed */}
      {clientToken && auth?.token && cart.length > 0 && (
        <>
          <DropIn
            options={{ authorization: clientToken }}
            onInstance={setInstance}
          />
          <button className="btn btn-primary" onClick={handlePayment}>
            Pay Now
          </button>
        </>
      )}
    </Layout>
  );
};

export default CartPage;
