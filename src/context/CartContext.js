import React, { createContext, useContext, useReducer } from 'react';

// Cart context
const CartContext = createContext();

// Initial state of the cart
const initialState = {
    cartItems: [],
};

// Cart reducer to manage cart state
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // Check if the item is already in the cart
            const inCart = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            return inCart
                ? {
                      ...state,
                      cartItems: state.cartItems.map((item) =>
                          item.id === action.payload.id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                      ),
                  }
                : {
                      ...state,
                      cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
                  };

        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
            };

        // Add more cases for other actions like adjusting quantity, etc.
        default:
            return state;
    }
};

// CartProvider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Actions
    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (itemId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id: itemId } });
    };

    // More actions can be added here

    return (
        <CartContext.Provider value={{ cart: state.cartItems, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
