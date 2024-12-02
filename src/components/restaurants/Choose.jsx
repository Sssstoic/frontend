import React, { useState } from 'react';
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa';
import mdbbqImage from '../../assets/mdbbq.png';
import ViewRestaurantButton from '../shared/ViewRestaurantButton';

const restaurants = [
    {
        id: 1,
        name: 'MDBBQ',
        cuisine: 'BBQ',
        rating: 4.5,
        deliveryTime: '30-45 min',
        price: '$$',
        image: mdbbqImage,
    },
];

const cuisineTypes = ['All', 'BBQ', 'American', 'Japanese', 'Korean'];
const priceRanges = ['All', '$', '$$', '$$$'];

const RestaurantPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('All');
    const [selectedPrice, setSelectedPrice] = useState('All');

    const filteredRestaurants = restaurants.filter(restaurant =>
        (selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine) &&
        (selectedPrice === 'All' || restaurant.price === selectedPrice) &&
        (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Restaurant</h1>

            {/* Search and Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
                {/* Search Input */}
                <div className="relative flex-grow max-w-md">
                    <input
                        type="text"
                        placeholder="Search restaurants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Cuisine Filter */}
                <div className="flex items-center gap-2">
                    <FaFilter className="text-gray-600" />
                    <select
                        value={selectedCuisine}
                        onChange={(e) => setSelectedCuisine(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {cuisineTypes.map(cuisine => (
                            <option key={cuisine} value={cuisine}>{cuisine}</option>
                        ))}
                    </select>
                </div>

                {/* Price Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Price:</span>
                    {priceRanges.map(price => (
                        <button
                            key={price}
                            onClick={() => setSelectedPrice(price)}
                            className={`px-3 py-2 rounded-md ${
                                selectedPrice === price
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 text-gray-700'
                            } transition duration-300`}
                        >
                            {price}
                        </button>
                    ))}
                </div>
            </div>

            {/* Restaurants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map(restaurant => (
                    <div
                        key={restaurant.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-2xl font-bold">{restaurant.name}</h2>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <FaStar />
                                    <span>{restaurant.rating}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>{restaurant.cuisine} Cuisine</span>
                                <span>{restaurant.price}</span>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                Delivery: {restaurant.deliveryTime}
                            </div>

                            {/* Use ViewRestaurantButton */}
                            <ViewRestaurantButton restaurantId={restaurant.id} />
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results Handling */}
            {filteredRestaurants.length === 0 && (
                <div className="text-center text-gray-600 mt-8">
                    <p className="text-2xl">No restaurants found</p>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};

export default RestaurantPage;
