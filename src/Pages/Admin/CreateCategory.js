import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import api from "../../api/axios"; // ✅ use centralized axios
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // CREATE CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/api/v1/category/create-category",
        { name }
      );

      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await api.get(
        "/api/v1/category/get-category"
      );

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // UPDATE CATEGORY
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data?.success) {
        toast.success(`${updatedName} updated`);
        setVisible(false);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(
        `/api/v1/category/delete-category/${id}`
      );

      if (data?.success) {
        toast.success("Category deleted");
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="Dashboard - Create Category">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Manage Category</h1>

            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;