import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/WebsiteHeader";
import ProductPage from "./components/ProductListing";
import { ShoppingCartProvider } from "./context/CartContext";

const App = () => {
  return (
    <ShoppingCartProvider>
      <Header />
      <Container className="my-4">
        <ProductPage />
      </Container>
    </ShoppingCartProvider>
  );
};

export default App;
