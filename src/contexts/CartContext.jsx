import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 1. Create the Context
const CartContext = createContext();
export const useCart = () => useContext(CartContext);


// 2. Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    default:
      return state;
  }
};

// 3. Provider component
 const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(
    cartReducer,
    [],
    () => {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    }
  );

  // 4. Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 5. Action creators
  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 6. Custom hook to use cart context
export default CartProvider

