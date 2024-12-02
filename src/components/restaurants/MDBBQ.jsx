import React, { useState, useCallback, useMemo, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bulgogi from '../../assets/bulgogi.jpg';
import classicbbq from '../../assets/classicbbq.jpeg';
import porkBelly from '../../assets/porkBelly.webp';
import promo from '../../assets/promo.jpg';
import { 
  FaUtensils, FaClipboardList, FaCalendarAlt, 
  FaMapMarkerAlt, FaShoppingCart, FaStar 
} from 'react-icons/fa';
import { b } from 'framer-motion/client';

// Sample data (you might want to move this to a separate file)
const menuItems = [
    {
        id: 1,
        name: 'Korean Beef Bulgogi',
        description: 'Signature Korean Beef Dish',
        price: 24.99,
        image: bulgogi,
    },
    {
        id: 2,
        name: 'Korean Beef Ribs',
        description: 'Tender beef ribs with special marinade',
        price: 29.99,
        image: classicbbq,
    },
    {
        id: 3,
        name: 'Spicy Pork Belly',
        description: 'Grilled spicy pork belly with side dishes',
        price: 22.99,
        image: porkBelly,
    }
];

const promotions = [
    {
        id: 1,
        title: 'Weekdays Special Offer',
        description: 'Get 10% off on all combo. Valid on weekdays only!',
        image: promo,
    },
];

// Cart Reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) return state;
            return [...state, { ...action.payload, quantity: 1 }];
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload);
        case 'INCREASE_QUANTITY':
            return state.map(item => 
                item.id === action.payload 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            );
        case 'DECREASE_QUANTITY':
            return state.map(item => 
                item.id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

const MDBBQ = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [cartItems, dispatchCart] = useReducer(cartReducer, [], () => {
        const savedCart = localStorage.getItem('mdbbq-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const navigate = useNavigate();

    // Persist cart to localStorage
    useEffect(() => {
        localStorage.setItem('mdbbq-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Memoized cart total
    const cartTotal = useMemo(() => 
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0), 
        [cartItems]
    );

    // Cart actions
    const addToCart = useCallback((item) => {
        dispatchCart({ type: 'ADD_ITEM', payload: item });
    }, []);

    const removeFromCart = useCallback((itemId) => {
        dispatchCart({ type: 'REMOVE_ITEM', payload: itemId });
    }, []);

    const increaseQuantity = useCallback((itemId) => {
        dispatchCart({ type: 'INCREASE_QUANTITY', payload: itemId });
    }, []);

    const decreaseQuantity = useCallback((itemId) => {
        dispatchCart({ type: 'DECREASE_QUANTITY', payload: itemId });
    }, []);

    // Checkout handler
    const handleCheckout = useCallback(() => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items before proceeding.');
        } else {
            navigate('/checkout');
        }
    }, [cartItems, navigate]);

    // Render content based on active tab
    const renderContent = () => {
        switch(activeTab) {
            case 'overview':
                return (
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">About MDBBQ</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                    MDBBQ brings the authentic taste of Korean BBQ to your table. 
                                    Our restaurant combines traditional cooking methods with modern culinary techniques, 
                                    creating an unforgettable dining experience.
                                </p>
                                <div className="flex items-center mb-4">
                                    <FaStar className="text-yellow-500 mr-2" />
                                    <span className="text-gray-600">4.5/5 (342 Reviews)</span>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Restaurant Highlights</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center">
                                        <FaUtensils className="mr-2 text-primary" />
                                        Authentic Korean BBQ
                                    </li>
                                    <li className="flex items-center">
                                        <FaClipboardList className="mr-2 text-primary" />
                                        Fresh, High-Quality Meats
                                    </li>
                                    <li className="flex items-center">
                                        <FaCalendarAlt className="mr-2 text-primary" />
                                        Traditional Cooking Methods
                                    </li>
                                    <li className="flex items-center">
                                        <FaMapMarkerAlt className="mr-2 text-primary" />
                                        Vegetarian Options Available
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'menu':
                return (
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Menu</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {menuItems.map(item => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h3>
                                        <p className="text-gray-600 mb-3">{item.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</span>
                                            <button 
                                                onClick={() => addToCart(item)}
                                                className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primaryDark transition-colors"
                                            >
                                                {cartItems.some(cartItem => cartItem.id === item.id) 
                                                    ? "Added" 
                                                    : "Add to Cart"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'ordering':
                return (
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            {cartItems.length === 0 ? (
                                <div className="text-center text-gray-600">
                                    <FaShoppingCart className="mx-auto text-4xl mb-4 text-gray-400" />
                                    <p>Your cart is empty. Start adding some delicious items!</p>
                                </div>
                            ) : (
                                <>
                                    {cartItems.map(item => (
                                        <div 
                                            key={item.id} 
                                            className="flex justify-between items-center border-b py-4 last:border-b-0"
                                        >
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                                <p className="text-gray-600">
                                                    ${item.price.toFixed(2)} × {item.quantity} = 
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <button 
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300"
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button 
                                                    onClick={() => increaseQuantity(item.id)}
                                                    className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300"
                                                >
                                                    +
                                                </button>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-6 flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-800">Total:</span>
                                        <span className="text-xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <button 
                                        onClick={handleCheckout}
                                        className="w-full mt-4 bg-primary text-white py-3 rounded-lg hover:bg-primaryDark transition-colors"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            case 'promotions':
                return (
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Current Promotions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {promotions.map(promo => (
                                <div 
                                    key={promo.id} 
                                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105"
                                >
                                    <img 
                                        src={promo.image} 
                                        alt={promo.title} 
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{promo.title}</h3>
                                        <p className="text-gray-600 mb-3">{promo.description}</p>
                                        <span className="text-sm text-gray-500">
                                            Valid until: {promo.validUntil}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'reservations':
                return (
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Make a Reservation</h2>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <p className="text-gray-700 mb-4">
                                Booking a table at MDBBQ is quick and easy. Reserve your spot today!
                            </p>
                            {/* Placeholder for reservation form */}
                            <div className="text-center">
                                <button 
                                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryDark transition-colors"
                                >
                                    Book a Table
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div className="p-6 text-center text-gray-600">404 - Section Not Found</div>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Tab Navigation */}
            <nav className="mb-6">
                <ul className="flex justify-center space-x-6 border-b-2 border-gray-200 pb-2">
                    {['overview', 'menu', 'ordering', 'promotions', 'reservations'].map(tab => (
                        <li 
                            key={tab}
                            className={`
                                cursor-pointer 
                                uppercase 
                                text-sm 
                                font-semibold 
                                pb-2 
                                transition-colors 
                                ${activeTab === tab 
                                    ? 'text-primary border-b-2 border-primary' 
                                    : 'text-gray-500 hover:text-gray-800'}
                            `}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Render content based on active tab */}
            {renderContent()}
        </div>
    );
};

export default MDBBQ;