import { useState, useEffect } from "react";
import axios from "axios";

const useProductData = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/products/categories"),
        ]);

        setAllProducts(productsRes.data);
        setProductCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { allProducts, productCategories, isLoading, error };
};

export default useProductData;
