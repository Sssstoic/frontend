import React, { useState, useCallback, useMemo, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaClipboardList, FaCalendarAlt, FaMapMarkerAlt, FaShoppingCart, FaStar, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import bulgogi from '../../assets/bulgogi.jpg';
import classicbbq from '../../assets/classicbbq.jpeg';
import porkBelly from '../../assets/porkBelly.webp';
import promo from '../../assets/promo.jpg';

const MENU_ITEMS = [
  { 
    id: 1, 
    name: 'Korean Beef Bulgogi', 
    price: 24.99, 
    image: bulgogi,
    description: 'Tender marinated beef grilled to perfection'
  },
  { 
    id: 2, 
    name: 'Korean Beef Ribs', 
    price: 29.99, 
    image: classicbbq,
    description: 'Classic Korean-style BBQ beef ribs'
  },
  { 
    id: 3, 
    name: 'Spicy Pork Belly', 
    price: 22.99, 
    image: porkBelly,
    description: 'Spicy and crispy pork belly slices'
  },
];

const PROMOTIONS = [
  { 
    id: 1, 
    title: 'Weekdays Special Offer', 
    image: promo,
    description: 'Get 10% off on selected menu items during weekdays'
  },
];

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': 
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
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
  const [activeTab, setActiveTab] = useState('menu');
  const [cartItems, dispatchCart] = useReducer(cartReducer, JSON.parse(localStorage.getItem('mdbbq-cart')) || []);
  const [temporarilyAddedItems, setTemporarilyAddedItems] = useState({});
  const [reservationData, setReservationData] = useState({
    name: '',
    date: '',
    time: '',
    people: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('mdbbq-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartTotal = useMemo(() => 
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0), 
    [cartItems]
  );

  const addToCart = useCallback((item) => {
    dispatchCart({ type: 'ADD_ITEM', payload: item });

    setTemporarilyAddedItems(prev => ({
      ...prev,
      [item.id]: true
    }));

    const timer = setTimeout(() => {
      setTemporarilyAddedItems(prev => {
        const updated = {...prev};
        delete updated[item.id];
        return updated;
      });
    }, 2000);

    return () => clearTimeout(timer);
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

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    sessionStorage.setItem('checkoutCart', JSON.stringify({
      items: cartItems,
      total: cartTotal
    }));
    
    navigate('/checkout');
  }, [cartItems, cartTotal, navigate]);

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservationSubmit = () => {
    // Here you would handle the form submission, e.g., store the reservation in a database
    alert(`Reservation confirmed for ${reservationData.name} on ${reservationData.date} at ${reservationData.time} for ${reservationData.people} people.`);
    setReservationData({ name: '', date: '', time: '', people: '' }); // Reset reservation form after submission
  };

  const renderMenuItems = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {MENU_ITEMS.map(item => (
        <div 
          key={item.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-48 object-cover hover:scale-105 transition-transform"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-green-600">${item.price.toFixed(2)}</span>
              <button 
                onClick={() => addToCart(item)}
                className={`
                  px-4 py-2 rounded 
                  ${temporarilyAddedItems[item.id]
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'}
                  transition-colors duration-300
                `}
              >
                {temporarilyAddedItems[item.id] ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCartItems = () => (
    <div className="space-y-4">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FaShoppingCart className="text-4xl mb-4" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          {cartItems.map(item => (
            <div 
              key={item.id} 
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button 
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-200 p-2 rounded-l"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-4 py-2 bg-gray-100">{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-200 p-2 rounded-r"
                  >
                    <FaPlus />
                  </button>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-green-600">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full mt-4 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderReservationForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Make a Reservation</h2>
      <form onSubmit={e => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Name</label>
          <input 
            type="text" 
            name="name"
            value={reservationData.name}
            onChange={handleReservationChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Date</label>
          <input 
            type="date" 
            name="date"
            value={reservationData.date}
            onChange={handleReservationChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Time</label>
          <input 
            type="time" 
            name="time"
            value={reservationData.time}
            onChange={handleReservationChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Number of People</label>
          <input 
            type="number" 
            name="people"
            value={reservationData.people}
            onChange={handleReservationChange}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>
        <button 
          type="button"
          onClick={handleReservationSubmit}
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition-colors"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <ul className="flex space-x-4 justify-center">
          {[ 
            { tab: 'menu', icon: <FaUtensils /> },
            { tab: 'ordering', icon: <FaShoppingCart /> },
            { tab: 'promotions', icon: <FaStar /> },
            { tab: 'reservations', icon: <FaCalendarAlt /> }
          ].map(({ tab, icon }) => (
            <li 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={` 
                flex items-center space-x-2 cursor-pointer px-4 py-2 rounded
                ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}
              `}
            >
              {icon}
              <span className="capitalize">{tab}</span>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab === 'menu' && renderMenuItems()}
      {activeTab === 'ordering' && renderCartItems()}
      {activeTab === 'promotions' && (
        <div className="grid md:grid-cols-2 gap-6">
          {PROMOTIONS.map(promo => (
            <div 
              key={promo.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src={promo.image} 
                alt={promo.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{promo.title}</h3>
                <p className="text-gray-600">{promo.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'reservations' && renderReservationForm()}
    </div>
  );
};

export default MDBBQ;
