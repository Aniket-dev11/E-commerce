import React from "react";
import {
  Modal,
  Button,
  ListGroup,
  Image,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FaShoppingCart, FaTrashAlt, FaTrashRestoreAlt } from "react-icons/fa";
import { useShoppingCart } from "../context/CartContext";
import "../style/cart-modal.css";

const ShoppingCartModal = ({ isVisible, onClose }) => {
  const { cartItems, dispatch, calculateTotal } = useShoppingCart();

  return (
    <Modal show={isVisible} onHide={onClose} centered>
      <Modal.Header
        style={{ backgroundColor: "#522546" }}
        closeButton
        className="text-white"
      >
        <Modal.Title>
          <FaShoppingCart className="me-2" /> Your Shopping Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="cart-modal-body">
        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Your cart is empty.</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => (
              <ListGroup.Item
                key={cartItem.id}
                className="d-flex align-items-center gap-3"
              >
                <Row>
                  <Col xs={12} lg={2}>
                    <Image
                      src={cartItem.image}
                      alt={cartItem.title}
                      className="rounded"
                      style={{
                        height: "60px",
                        width: "60px",
                        objectFit: "contain",
                        background: "#f8f9fa",
                      }}
                    />
                  </Col>
                  <Col xs={12} ld={5}>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{cartItem.title}</div>{" "}
                      <div className="text-muted small">
                        ${(cartItem.price * cartItem.qty).toFixed(2)} {/* */}
                      </div>
                    </div>
                  </Col>
                  <Col xs={4} lg={4}>
                    {" "}
                    <InputGroup size="sm" className="quantity-controls">
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          dispatch({
                            type: "DECREMENT_ITEM",
                            payload: cartItem.id,
                          })
                        }
                      >
                        -
                      </Button>
                      <div className="qty-display px-2">{cartItem.qty}</div>{" "}
                      {/* */}
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          dispatch({
                            type: "INCREMENT_ITEM",
                            payload: cartItem.id,
                          })
                        }
                      >
                        +
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col xs={4} lg={1}>
                    {" "}
                    <Button
                      variant="danger"
                      size="sm"
                      className="trash-btn"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_ITEM",
                          payload: cartItem.id,
                        })
                      }
                    >
                      <FaTrashAlt />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      {cartItems.length > 0 && (
        <Modal.Footer className="justify-content-between bg-light rounded-bottom">
          <h5 className="mb-0">
            Total: <span className="text-success">${calculateTotal()}</span>{" "}
          </h5>
          <Button
            variant="success"
            onClick={() => {
              dispatch({ type: "CLEAR_CART" });
              onClose();
            }}
          >
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ShoppingCartModal;
