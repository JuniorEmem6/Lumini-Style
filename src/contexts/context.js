import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Implementation
    case 'REMOVE_ITEM':
      // Implementation
    case 'UPDATE_QUANTITY':
      // Implementation
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    // Load from localStorage
  });

  useEffect(() => {
    // Save to localStorage
  }, [cartItems]);

  // Action creators
  const addToCart = (item) => { /* ... */ };
  const removeFromCart = (id) => { /* ... */ };
  const updateQuantity = (id, quantity) => { /* ... */ };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);