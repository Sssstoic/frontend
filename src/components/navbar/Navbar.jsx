import React, { useState, useEffect } from 'react';
import { FaCaretDown, FaUser } from 'react-icons/fa';

const NavLinks = [
    { id: 1, name: 'Home', link: '/#' },
    { id: 2, name: 'About', link: '/#about' },
    { id: 3, name: 'Contact', link: '/#contact' },
];

const DropdownLinks = [
    { id: 1, name: "MDBBQ", link: "/#MDBBQ" },
];

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navbarOpacity, setNavbarOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setNavbarOpacity(0.8); // Reduce opacity when scrolling down
            } else {
                // Scrolling up
                setNavbarOpacity(1); // Full opacity when scrolling up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div 
            className="bg-white shadow-md"
            style={{ opacity: navbarOpacity, transition: 'opacity 0.3s' }}
        >
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
                        {/* Dropdown Trigger */}
                        <div
                            className="flex items-center gap-2 text-xl font-semibold hover:text-primary focus:text-primary transition duration-300"
                            onClick={handleDropdownToggle}
                            onKeyDown={(e) => e.key === 'Enter' && handleDropdownToggle()}
                            tabIndex={0}
                        >
                            Restaurants
                            <FaCaretDown className={`transition duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute bg-white shadow-md rounded-md mt-2 w-[200px] z-[9999] transition-all duration-300 ${dropdownOpen ? 'block' : 'hidden'}`}
                        >
                            <ul className="p-2">
                                {DropdownLinks.map(({ id, name, link }) => (
                                    <li key={id} className="px-4 py-2 hover:bg-gray-100 focus:bg-gray-100">
                                        <a href={link} className="text-lg font-medium hover:text-primary focus:text-primary transition duration-300">
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>

                    {/* Login Button */}
                    <li>
                        <button className="flex items-center gap-2 bg-secondary text-xl h-[40px] text-white px-5 py-2 rounded-md hover:scale-105 duration-300">
                            <FaUser />
                            My Account
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
