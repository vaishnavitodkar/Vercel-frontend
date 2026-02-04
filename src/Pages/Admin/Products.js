import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import api from "../../api/axios"; // ✅ centralized axios
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await api.get(
        "/api/v1/product/get-product"
      );

      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Dashboard - Products">
      <div className="row dashboard">
        <div className="col-md-3 p-5">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>

          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL || ""}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 60)}...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
