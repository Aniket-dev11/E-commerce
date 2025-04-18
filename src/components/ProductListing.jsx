import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import ItemCard from "./ItemCard";
import ProductFilters from "./ProductFilters";
import CustomPagination from "./CustomPagination";
import useProductData from "../hooks/useProductData";

const ProductListing = () => {
  const { allProducts, productCategories, isLoading, error } = useProductData();
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    if (allProducts.length) {
      setDisplayedProducts(allProducts);
    }
  }, [allProducts]);

  const handleFilterUpdate = (filtered) => {
    setDisplayedProducts(filtered);
    setActivePage(1);
  };

  const indexOfLastProduct = activePage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <Row className="justify-content-end mb-2 align-items-center">
        <Col className="text-end">
          <ProductFilters
            products={allProducts}
            categories={productCategories}
            onFilterChange={handleFilterUpdate}
          />
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <div className="text-danger text-center">Failed to load products.</div>
      ) : (
        <>
          <Row className="g-4">
            {currentProducts.map((product) => (
              <Col key={product.id} sm={6} md={4} lg={4} xl={3}>
                <ItemCard product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <CustomPagination
                totalItems={displayedProducts.length}
                itemsPerPage={productsPerPage}
                activePage={activePage}
                onPageSelect={setActivePage}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductListing;
