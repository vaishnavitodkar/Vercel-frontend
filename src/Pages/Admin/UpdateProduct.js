import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  // GET SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await api.get(
        `/api/v1/product/get-product/${slug}`
      );

      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await api.get(
        "/api/v1/category/get-category"
      );
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  // UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      if (photo) productData.append("photo", photo);

      const { data } = await api.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const { data } = await api.delete(
        `/api/v1/product/delete-product/${id}`
      );

      if (data?.success) {
        toast.success("Product deleted");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Update Product</h1>

            <div className="m-1 w-75">
              <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <label className="btn btn-outline-secondary col-md-12 mb-3">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>

              <div className="text-center mb-3">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${id}`
                  }
                  height="200"
                  alt="product"
                />
              </div>

              <input
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                className="form-control mb-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                className="form-control mb-3"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                value={shipping}
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              <button className="btn btn-primary me-2" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>

              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
