import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    phone: '', 
    address: '', 
    city: '',
    zipCode: '',
    paymentMethod: 'credit', 
    cardNumber: '', 
    expiryDate: '', 
    cvv: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleNavigation = (path) => {
    setShowPopup(false);
    setTimeout(() => navigate(path), 0); // Ensures proper state update before navigating
  };
  
  // Enhanced cart and session management
  useEffect(() => {
    const savedCart = sessionStorage.getItem('checkoutCart');
    if (savedCart) {
      try {
        const { items, total: savedTotal } = JSON.parse(savedCart);
        setCartItems(items);
        setTotal(savedTotal);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        navigate('/menu');
      }
    } else {
      navigate('/menu');
    }
  }, [navigate]);

  // Memoized order summary with more robust calculations
  const orderSummary = useMemo(() => {
    const taxRate = 0.08;
    const deliveryFee = cartItems.length > 0 ? 5.00 : 0;
    const subtotal = total;
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax + deliveryFee;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  }, [total, cartItems]);

  // Improved input validation with more detailed error handling
  const validateForm = useCallback(() => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // Personal info validation
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Invalid phone number (10 digits required)';
    }
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required';

    // Payment validation
    if (formData.paymentMethod === 'credit') {
      const cardNumberRegex = /^\d{16}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3,4}$/;

      if (!formData.cardNumber.replace(/\s/g, '').match(cardNumberRegex)) {
        errors.cardNumber = 'Invalid card number (16 digits)';
      }
      if (!formData.expiryDate.match(expiryRegex)) {
        errors.expiryDate = 'Invalid expiry (MM/YY format)';
      }
      if (!formData.cvv.match(cvvRegex)) {
        errors.cvv = 'Invalid CVV';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Input change handler with optional formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Add input formatting for specific fields
    switch (name) {
      case 'phone':
        formattedValue = value.replace(/\D/g, '').slice(0, 10);
        break;
      case 'cardNumber':
        formattedValue = value.replace(/\D/g, '').slice(0, 16)
          .replace(/(\d{4})/g, '$1 ').trim();
        break;
      case 'expiryDate':
        formattedValue = value.replace(/\D/g, '').slice(0, 4)
          .replace(/^(\d{2})/, '$1/');
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
        break;
      default:
        break;
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  // Order submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // In a real app, you'd send this to a backend service
        const orderDetails = {
          ...formData,
          items: cartItems,
          total: parseFloat(orderSummary.grandTotal)
        };
        
        // Simulate order processing
        console.log('Order processed:', orderDetails);
        
        sessionStorage.removeItem('checkoutCart');
        setShowPopup(true);
      } catch (error) {
        console.error('Order submission error:', error);
      }
    }
  };

  // Render methods separated for readability
  const renderCartItems = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaShoppingCart className="mr-3" /> Your Order
      </h2>
      {cartItems.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <div className="flex items-center">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-16 h-16 object-cover rounded mr-4" 
              onError={(e) => e.target.src = '/placeholder-image.png'}
            />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>${item.price.toFixed(2)} × {item.quantity}</p>
            </div>
          </div>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );

  const renderOrderSummary = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between"><span>Subtotal</span><span>${orderSummary.subtotal}</span></div>
        <div className="flex justify-between"><span>Tax (8%)</span><span>${orderSummary.tax}</span></div>
        <div className="flex justify-between"><span>Delivery Fee</span><span>${orderSummary.deliveryFee}</span></div>
        <div className="flex justify-between font-bold text-xl pt-3 border-t"><span>Total</span><span>${orderSummary.grandTotal}</span></div>
      </div>
    </div>
  );

  const renderCheckoutForm = () => (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Checkout Details</h2>
      
      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 flex items-center">
            <FaUser className="mr-2" /> Full Name
          </label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Enter full name"
            className={`w-full p-2 border rounded ${formErrors.name ? 'border-red-500' : ''}`} 
          />
          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
        </div>
        
        <div>
          <label className="block mb-2 flex items-center">
            <FaEnvelope className="mr-2" /> Email
          </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            placeholder="Enter email"
            className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : ''}`} 
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-2 flex items-center">
            <FaPhone className="mr-2" /> Phone
          </label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleInputChange} 
            placeholder="Enter phone number"
            className={`w-full p-2 border rounded ${formErrors.phone ? 'border-red-500' : ''}`} 
          />
          {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
        </div>
        
        <div>
          <label className="block mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> City
          </label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={handleInputChange} 
            placeholder="Enter city"
            className={`w-full p-2 border rounded ${formErrors.city ? 'border-red-500' : ''}`} 
          />
          {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-2 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> Address
        </label>
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleInputChange} 
          placeholder="Enter full address"
          className={`w-full p-2 border rounded ${formErrors.address ? 'border-red-500' : ''}`} 
        />
        {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
  <div>
    <label className="block mb-2">Postal Code</label>
    <input 
      type="text" 
      name="postalCode"  // Name attribute for postalCode
      value={formData.postalCode}  // Bind formData.postalCode to input
      onChange={handleInputChange}  // Handle input change
      onInput={(e) => {
        // Automatically convert to uppercase and format correctly (with space)
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/(.{3})(.{3})/, '$1 $2');
      }}  // Format to Uppercase and ensure space between third and fourth characters
      placeholder="Enter Postal code"
      pattern="[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d"  // Regex pattern for "LetterNumberLetter NumberLetterNumber"
      maxLength="7"  // Limit to 7 characters (including the space)
      className={`w-full p-2 border rounded ${formErrors.postalCode ? 'border-red-500' : ''}`}  // Styling with error check
    />
    {formErrors.postalCode && <p className="text-red-500 text-sm mt-1">{formErrors.postalCode}</p>}  
  </div>
</div>

      {/* Payment Method Selection */}
      <div className="mt-4">
        <label className="block mb-2">Payment Method</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input 
              type="radio" 
              name="paymentMethod" 
              value="credit" 
              checked={formData.paymentMethod === 'credit'} 
              onChange={handleInputChange} 
              className="mr-2" 
            />
            <FaCreditCard className="mr-2" /> Credit Card
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              name="paymentMethod" 
              value="paypal" 
              checked={formData.paymentMethod === 'paypal'} 
              onChange={handleInputChange} 
              className="mr-2" 
            />
            PayPal
          </label>
        </div>
      </div>

      {/* Credit Card Details */}
      {formData.paymentMethod === 'credit' && (
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Card Number</label>
            <input 
              type="text" 
              name="cardNumber" 
              value={formData.cardNumber} 
              onChange={handleInputChange} 
              placeholder="1234 5678 9012 3456"
              className={`w-full p-2 border rounded ${formErrors.cardNumber ? 'border-red-500' : ''}`} 
            />
            {formErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>}
          </div>
          <div>
            <label className="block mb-2">Expiry Date</label>
            <input 
              type="text" 
              name="expiryDate" 
              value={formData.expiryDate} 
              onChange={handleInputChange} 
              placeholder="MM/YY"
              className={`w-full p-2 border rounded ${formErrors.expiryDate ? 'border-red-500' : ''}`} 
            />
            {formErrors.expiryDate && <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>}
          </div>
          <div>
            <label className="block mb-2">CVV</label>
            <input 
              type="text" 
              name="cvv" 
              value={formData.cvv} 
              onChange={handleInputChange} 
              placeholder="123"
              className={`w-full p-2 border rounded ${formErrors.cvv ? 'border-red-500' : ''}`} 
            />
            {formErrors.cvv && <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>}
          </div>
        </div>
      )}

      <button 
        type="submit" 
        className="w-full mt-6 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
      >
        Complete Order
      </button>
    </form>
  );

  // Confirmation Popup Component
  const renderConfirmationPopup = () => (
    showPopup && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md w-full">
          <div className="mb-6">
            <svg 
              className="mx-auto mb-4 text-green-500 w-16 h-16" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you, {formData.name}! Your order has been successfully placed.
              A confirmation email will be sent to {formData.email}.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => handleNavigation('/Choose')} 
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => handleNavigation('/')} 
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Home Page
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Main render method
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {renderConfirmationPopup()}
      
      <div className="grid md:grid-cols-2 gap-6">
        {renderCartItems()}
        {renderOrderSummary()}
      </div>

      {renderCheckoutForm()}
    </div>
  );
};

export default Checkout;