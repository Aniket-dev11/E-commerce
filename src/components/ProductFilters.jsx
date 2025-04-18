import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

const ProductFilters = ({ products, categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }

    switch (sortOrder) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    onFilterChange(filtered);
  }, [selectedCategory, sortOrder, minPrice, maxPrice, products]);

  return (
    <Row className="mb-3">
      <Col>
        <div className="d-flex flex-wrap justify-content-end gap-3">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: "180px" }}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ width: "180px" }}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A–Z</option>
            <option value="title-desc">Title: Z–A</option>
          </Form.Select>

          <Form.Control
            type="number"
            min="0"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ width: "120px" }}
          />

          <Form.Control
            type="number"
            min="0"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: "120px" }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ProductFilters;
