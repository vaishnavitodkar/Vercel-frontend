import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getSimilarProduct = async (pid, cid) => {
    const { data } = await api.get(
      `/api/v1/product/related-product/${pid}/${cid}`
    );
    setRelatedProducts(data.products || []);
  };

  const getProduct = useCallback(async () => {
    const { data } = await api.get(
      `/api/v1/product/get-product/${slug}`
    );
    setProduct(data.product);
    getSimilarProduct(data.product._id, data.product.category._id);
  }, [slug]);

  useEffect(() => {
    if (slug) getProduct();
  }, [slug, getProduct]);

  return (
    <Layout>
      <div className="container product-details">
        <img
          src={`${api.defaults.baseURL}/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          height="300"
        />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>₹ {product.price}</p>
      </div>

      <hr />

      <div className="container similar-products">
        <h4>Similar Products</h4>
        <div className="d-flex flex-wrap">
          {relatedProducts.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${api.defaults.baseURL}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
              <div className="card-body">
                <h5>{p.name}</h5>
                <button
                  className="btn btn-info"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
