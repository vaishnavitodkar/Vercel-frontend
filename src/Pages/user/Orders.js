import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import api from "../../api/axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await api.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>

            {orders?.map((o, i) => (
              <div className="border shadow mb-4" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o.status}</td>
                      <td>{o.buyer.name}</td>
                      <td>{moment(o.createdAt).fromNow()}</td>
                      <td>{o.payment.success ? "Success" : "Failed"}</td>
                      <td>{o.products.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="container">
                  {o.products.map((p) => (
                    <div className="row card flex-row mb-2 p-3" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          height="100"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>₹ {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
