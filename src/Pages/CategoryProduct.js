import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import api from "../api/axios";

const CategoryProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const getProductsByCat = useCallback(async () => {
    try {
      const { data } = await api.get(
        `/api/v1/product/product-category/${slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) getProductsByCat();
  }, [slug, getProductsByCat]);

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products.length} result found</h6>

        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`${api.defaults.baseURL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5>{p.name}</h5>
                    <p>{p.description.substring(0, 60)}...</p>
                    <button
                      className="btn btn-info"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
