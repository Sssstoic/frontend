// src/context/CartContext.jsx

import React, { createContext, useContext, useReducer } from 'react';

// Create a context
const CartContext = createContext();

// Reducer to manage cart actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };

        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };

        case 'DECREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems
                    .map(item =>
                        item.id === action.payload
                            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                            : item
                    )
                    .filter(item => item.quantity > 0), // Remove item if quantity is 0
            };

        case 'CLEAR_CART':
            return { ...state, cartItems: [] };

        default:
            return state;
    }
};

// Initial state
const initialState = {
    cartItems: [],
};

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
    const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    const increaseQuantity = (id) => dispatch({ type: 'INCREASE_QUANTITY', payload: id });
    const decreaseQuantity = (id) => dispatch({ type: 'DECREASE_QUANTITY', payload: id });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const cartTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems: state.cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
