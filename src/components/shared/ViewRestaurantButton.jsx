import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const ViewRestaurantButton = ({ restaurantId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurants/${restaurantId}`);
    
  };

  return (
    <div className="flex items-center group">
      <button
        onClick={handleClick}
        className="bg-primary text-white px-6 py-3 rounded-md flex items-center gap-2 group-hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 duration-300"
      >
        View Restaurant
        <FaArrowRight className="inline-block transition-transform transform group-hover:translate-x-2 duration-200 text-base" />
      </button>
    </div>
  );
};

export default ViewRestaurantButton;
