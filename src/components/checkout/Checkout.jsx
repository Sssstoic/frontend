import React, { useState } from 'react';
import { 
    FaShoppingCart, 
    FaUser, 
    FaCreditCard, 
    FaMapMarkerAlt, 
    FaCheckCircle 
} from 'react-icons/fa';

const CheckoutPage = () => {
    const [step, setStep] = useState(1);
    const [orderDetails, setOrderDetails] = useState({
        customer: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        delivery: {
            address: '',
            city: '',
            state: '',
            zipCode: '',
            instructions: ''
        },
        payment: {
            cardNumber: '',
            cardName: '',
            expiration: '',
            cvv: ''
        }
    });

    const cartItems = [
        {
            id: 1,
            name: 'Classic BBQ Combo',
            price: 24.99,
            quantity: 2,
            image: '/api/placeholder/100/100'
        },
        {
            id: 2,
            name: 'Spicy Pork Belly',
            price: 22.99,
            quantity: 1,
            image: '/api/placeholder/100/100'
        }
    ];

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08; // 8% tax
        const delivery = 5.00;
        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            delivery: delivery.toFixed(2),
            total: (subtotal + tax + delivery).toFixed(2)
        };
    };

    const handleInputChange = (section, field, value) => {
        setOrderDetails(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaShoppingCart className="mr-3 text-primary" /> 
                            Order Summary
                        </h2>
                        {cartItems.map(item => (
                            <div 
                                key={item.id} 
                                className="flex items-center justify-between border-b py-4"
                            >
                                <div className="flex items-center">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-16 h-16 object-cover rounded mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-600">
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-bold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                        <div className="mt-4">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${calculateTotal().subtotal}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax (8%)</span>
                                <span>${calculateTotal().tax}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Delivery Fee</span>
                                <span>${calculateTotal().delivery}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl border-t pt-2">
                                <span>Total</span>
                                <span>${calculateTotal().total}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setStep(2)}
                            className="w-full mt-6 bg-primary text-white py-3 rounded-md hover:bg-primaryDark"
                        >
                            Proceed to Customer Information
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaUser className="mr-3 text-primary" /> 
                            Customer Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="First Name"
                                value={orderDetails.customer.firstName}
                                onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name"
                                value={orderDetails.customer.lastName}
                                onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <input 
                                type="email" 
                                placeholder="Email Address"
                                value={orderDetails.customer.email}
                                onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                                className="w-full p-3 border rounded-md md:col-span-2"
                            />
                            <input 
                                type="tel" 
                                placeholder="Phone Number"
                                value={orderDetails.customer.phone}
                                onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <button 
                                onClick={() => setStep(1)}
                                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                onClick={() => setStep(3)}
                                className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primaryDark"
                            >
                                Continue to Delivery
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaMapMarkerAlt className="mr-3 text-primary" /> 
                            Delivery Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="Street Address"
                                value={orderDetails.delivery.address}
                                onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
                                className="w-full p-3 border rounded-md md:col-span-2"
                            />
                            <input 
                                type="text" 
                                placeholder="City"
                                value={orderDetails.delivery.city}
                                onChange={(e) => handleInputChange('delivery', 'city', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <input 
                                type="text" 
                                placeholder="State"
                                value={orderDetails.delivery.state}
                                onChange={(e) => handleInputChange('delivery', 'state', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <input 
                                type="text" 
                                placeholder="Zip Code"
                                value={orderDetails.delivery.zipCode}
                                onChange={(e) => handleInputChange('delivery', 'zipCode', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <textarea 
                                placeholder="Delivery Instructions (Optional)"
                                value={orderDetails.delivery.instructions}
                                onChange={(e) => handleInputChange('delivery', 'instructions', e.target.value)}
                                className="w-full p-3 border rounded-md md:col-span-2"
                                rows="3"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <button 
                                onClick={() => setStep(2)}
                                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                onClick={() => setStep(4)}
                                className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primaryDark"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaCreditCard className="mr-3 text-primary" /> 
                            Payment Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="Card Number"
                                value={orderDetails.payment.cardNumber}
                                onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                                className="w-full p-3 border rounded-md md:col-span-2"
                            />
                            <input 
                                type="text" 
                                placeholder="Name on Card"
                                value={orderDetails.payment.cardName}
                                onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <input 
                                type="text" 
                                placeholder="Expiration (MM/YY)"
                                value={orderDetails.payment.expiration}
                                onChange={(e) => handleInputChange('payment', 'expiration', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <input 
                                type="text" 
                                placeholder="CVV"
                                value={orderDetails.payment.cvv}
                                onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <button 
                                onClick={() => setStep(3)}
                                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                onClick={() => setStep(5)}
                                className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primaryDark"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for your order. A confirmation email has been sent to {orderDetails.customer.email}.
                        </p>
                        <div className="bg-gray-100 p-4 rounded-md mb-6">
                            <h3 className="font-semibold mb-2">Order Details</h3>
                            <p>Order Number: #{Math.floor(Math.random() * 1000000)}</p>
                            <p>Total Amount: ${calculateTotal().total}</p>
                            <p>Estimated Delivery: {new Date(Date.now() + 3600000).toLocaleString()}</p>
                        </div>
                        <button 
                            onClick={() => {/* Navigate to home or orders */}}
                            className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primaryDark"
                        >
                            Back to Home
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Progress Indicator */}
                <div className="flex justify-between mb-8">
                    {['Order Summary', 'Customer Info', 'Delivery', 'Payment', 'Confirmation'].map((label, index) => (
                        <div 
                            key={label}
                            className={`flex-1 text-center ${
                                step > index 
                                    ? 'text-primary' 
                                    : step === index + 1 
                                    ? 'text-primary font-bold' 
                                    : 'text-gray-400'
                            }`}
                        >
                            <div 
                                className={`h-2 rounded-full mb-2 ${
                                    step > index 
                                        ? 'bg-primary' 
                                        : step === index + 1 
                                        ? 'bg-primary' 
                                        : 'bg-gray-300'
                                }`}
                            />
                            {label}
                        </div>
                    ))}
                </div>

                {/* Checkout Content */}
                {renderStep()}
            </div>
        </div>
    );
};

export default CheckoutPage;