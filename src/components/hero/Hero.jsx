import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroImg from '../../assets/Ttuckbboki.jpeg';
import ChefImage from '../../assets/chef.jpg';
import RestaurantInterior from '../../assets/restaurant-interior.jpg';
import PrimaryButton from '../Shared/PrimaryButton';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

const CombinedComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                  Satisfy Your{' '}
                  <span className="text-secondary font-cursive text-5xl md:text-6xl block md:inline">
                    Cravings
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-xl mx-auto md:mx-0 mb-6">
                  Embark on a culinary journey through authentic Korean flavors,
                  where every bite tells a story of tradition and passion.
                </p>
                <div className="flex justify-center md:justify-start">
                  <PrimaryButton />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="relative">
                <img 
                  src={HeroImg} 
                  alt="Ttuckbuoki" 
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
              </div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-extrabold text-primary">
                  Our Story
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Founded in the heart of the city, our restaurant is a celebration of Korean culinary traditions. 
                  What started as a small family kitchen has grown into a beloved dining destination, 
                  bringing authentic flavors and warm hospitality to our community.
                </p>
                <p className="text-lg text-gray-500">
                  Our chefs meticulously craft each dish, honoring recipes passed down through generations, 
                  while adding our own contemporary twist.
                </p>
              </div>
              <div className="relative group">
                <img 
                  src={ChefImage} 
                  alt="Our Head Chef" 
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative group md:order-2">
                <img 
                  src={RestaurantInterior} 
                  alt="Restaurant Interior" 
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
              </div>
              <div className="space-y-6 md:order-1">
                <h2 className="text-4xl font-extrabold text-secondary">
                  Our Philosophy
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We believe in more than just serving food – we're creating experiences. 
                  Every dish tells a story of Korean culinary heritage, 
                  prepared with the freshest ingredients and deepest respect for tradition.
                </p>
                <ul className="space-y-3 text-lg text-gray-500 pl-5">
                  <li className="relative before:absolute before:left-[-20px] before:top-2 
                                 before:w-3 before:h-3 before:bg-primary before:rounded-full">
                    Authentic Recipes
                  </li>
                  <li className="relative before:absolute before:left-[-20px] before:top-2 
                                 before:w-3 before:h-3 before:bg-primary before:rounded-full">
                    Fresh, Local Ingredients
                  </li>
                  <li className="relative before:absolute before:left-[-20px] before:top-2 
                                 before:w-3 before:h-3 before:bg-primary before:rounded-full">
                    Warm Hospitality
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div className="space-y-8">
              <h2 className="text-4xl font-extrabold text-primary mb-6">
                Contact Us
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-3xl text-secondary" />
                  <div>
                    <h3 className="font-bold text-xl">Address</h3>
                    <p className="text-gray-600">123 Korean Street, Flavor District</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-3xl text-secondary" />
                  <div>
                    <h3 className="font-bold text-xl">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-3xl text-secondary" />
                  <div>
                    <h3 className="font-bold text-xl">Email</h3>
                    <p className="text-gray-600">hello@koreaninspiredrestaurant.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaClock className="text-3xl text-secondary" />
                  <div>
                    <h3 className="font-bold text-xl">Hours</h3>
                    <p className="text-gray-600">
                      Mon-Thu: 11am - 9pm
                      <br />
                      Fri-Sat: 11am - 11pm
                      <br />
                      Sun: 12pm - 8pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-bold rounded-lg flex justify-center items-center space-x-4 hover:bg-primary-dark transition duration-300"
                >
                  <FaPaperPlane className="text-lg" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
