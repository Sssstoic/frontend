import React, { useState } from 'react';
import { FaCaretDown, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Added FaSignOutAlt for the logout icon
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Firebase signOut method
import { auth } from '../_utils/Firebase'; // Firebase auth import

const NavLinks = [
  { id: 1, name: 'Home', link: '/#' },
  { id: 2, name: 'About', link: '/#about' },
  { id: 3, name: 'Contact', link: '/#contact' },
];

const DropdownLinks = [
  { id: 1, name: "MDBBQ", link: "/restaurants/mdbbq" }, // Route path for MDBBQ
];

const Navbar = ({ user, HandlePopup, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown menu visibility
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="font-bold text-3xl">K-Plat Trading Inc.</div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8">
          {NavLinks.map(({ id, name, link }) => (
            <li key={id}>
              <a href={link} className="text-xl font-semibold hover:text-primary focus:text-primary transition duration-300">
                {name}
              </a>
            </li>
          ))}

          {/* Dropdown */}
          <li className="group cursor-pointer relative">
            <div
              className="flex items-center gap-2 text-xl font-semibold hover:text-primary focus:text-primary transition duration-300"
              onClick={handleDropdownToggle}
              onKeyDown={(e) => e.key === 'Enter' && handleDropdownToggle()}
              tabIndex={0}
            >
              Restaurants
              <FaCaretDown className={`transition duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            <div
              className={`absolute bg-white shadow-md rounded-md mt-2 w-[200px] z-[9999] transition-all duration-300 ${dropdownOpen ? 'block' : 'hidden'}`}
            >
              <ul className="p-2">
                {DropdownLinks.map(({ id, name, link }) => (
                  <li key={id} className="px-4 py-2 hover:bg-gray-100 focus:bg-gray-100">
                    <Link to={link} className="text-lg font-medium hover:text-primary focus:text-primary transition duration-300">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Login/Logout Button */}
          <li>
            {user ? (
              <button
                onClick={handleLogout} // Pass handleLogout here
                className="flex items-center gap-2 bg-secondary text-xl h-[40px] text-white px-5 py-2 rounded-md hover:scale-105 duration-300"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <button
                onClick={HandlePopup} // Show the login popup
                className="flex items-center gap-2 bg-secondary text-xl h-[40px] text-white px-5 py-2 rounded-md hover:scale-105 duration-300"
              >
                <FaUser />
                My Account
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
