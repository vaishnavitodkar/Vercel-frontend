

import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
