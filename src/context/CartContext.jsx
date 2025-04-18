import React, { createContext, useContext, useReducer, useEffect } from "react";

const ShoppingCartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, qty: 1 }];
      }

    case "INCREMENT_ITEM":
      return state.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
      );

    case "DECREMENT_ITEM":
      return state
        .map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0);

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
};

const getInitialCartState = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart && storedCart !== "undefined"
      ? JSON.parse(storedCart)
      : [];
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
    return [];
  }
};

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(
    cartReducer,
    [],
    getInitialCartState
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, dispatch, calculateTotal }}
    >
      {" "}
      {/* */}
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);
