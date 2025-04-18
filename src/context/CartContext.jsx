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

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, dispatch, calculateTotal }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);
