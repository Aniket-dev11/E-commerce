import React, { useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useShoppingCart } from "../context/CartContext";
import ShoppingCartModal from "./ShoppingCartModal";

const WebsiteHeader = () => {
  const { cartItems } = useShoppingCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#522546" }}
        variant="dark"
        expand="lg"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#">E-Commerce-site</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={openModal}>
              {" "}
              {/* */}
              <FaShoppingCart size={20} />
              <Badge bg="light" text="dark" className="ms-1">
                {totalItems} {/* */}
              </Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <ShoppingCartModal isVisible={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default WebsiteHeader;
