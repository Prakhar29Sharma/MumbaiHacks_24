import React, { useState } from "react";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header className="bg-white shadow-md font-[sans-serif]">
      <div className="flex items-center justify-between p-4 sm:px-6 lg:px-8">
        {/* Logo and Hamburger Icon */}
        <div className="flex items-center">
          <button
            className="sm:hidden block"
            onClick={toggleMenu}
          >
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <a href="/" className="ml-4">
            <img
              src="https://png.pngtree.com/png-clipart/20221030/original/pngtree-university-logo-in-flat-style-png-image_8743732.png"
              alt="logo"
              className="w-12"
            />
          </a>
        </div>

        {/* Nav Items */}
        <nav className="hidden sm:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-semibold">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-semibold">
            Settings
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-semibold">
            Profile
          </a>
        </nav>

        {/* Avatar */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="w-10 h-10 text-xl text-white bg-blue-600 flex items-center justify-center cursor-pointer rounded-full">
            S
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuVisible && (
        <div className="sm:hidden bg-white shadow-md fixed inset-0 z-50 p-4">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <nav className="mt-16 space-y-4">
            <a href="#" className="block text-gray-600 hover:text-blue-600 text-lg font-semibold">
              Home
            </a>
            <a href="#" className="block text-gray-600 hover:text-blue-600 text-lg font-semibold">
              Settings
            </a>
            <a href="#" className="block text-gray-600 hover:text-blue-600 text-lg font-semibold">
              Profile
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
