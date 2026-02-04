import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import api from "../api/axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = useCallback(async () => {
    const { data } = await api.get("/api/v1/category/get-category");
    if (data?.success) setCategories(data.category);
  }, []);

  const getAllProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get(`/api/v1/product/product-list/${page}`);
    setProducts(data.products);
    setLoading(false);
  }, [page]);

  const getTotal = useCallback(async () => {
    const { data } = await api.get("/api/v1/product/product-count");
    setTotal(data.total);
  }, []);

  const loadMore = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get(`/api/v1/product/product-list/${page}`);
    setProducts((prev) => [...prev, ...data.products]);
    setLoading(false);
  }, [page]);

  const filterProduct = useCallback(async () => {
    const { data } = await api.post("/api/v1/product/product-filters", {
      checked,
      radio,
    });
    setProducts(data.products);
  }, [checked, radio]);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [getAllCategory, getTotal]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page, loadMore]);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length, getAllProducts]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio, filterProduct]);

  const handleFilter = (value, id) => {
    setChecked((prev) =>
      value ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  return (
    <Layout title="All Products">
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4>Filter By Category</h4>
          {categories.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}

          <h4 className="mt-4">Filter By Price</h4>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices.map((p) => (
              <Radio key={p._id} value={p.array}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>

          <button
            className="btn btn-danger mt-3"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </div>

        <div className="col-md-9">
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`${api.defaults.baseURL}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 60)}...</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      const updated = [...cart, p];
                      setCart(updated);
                      localStorage.setItem("cart", JSON.stringify(updated));
                      toast.success("Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length < total && (
            <button
              className="btn btn-warning mt-3"
              onClick={() => setPage(page + 1)}
            >
              {loading ? "Loading..." : <>Load More <AiOutlineReload /></>}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
