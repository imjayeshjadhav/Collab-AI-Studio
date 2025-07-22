import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <a href="#" className="text-2xl font-bold text-blue-600">
            AI Code
          </a>

          {/* Hamburger menu (Mobile) */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 text-gray-700 font-medium">
            <li>
              <a href="#" className="hover:text-blue-600 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition duration-300">
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-2 px-6 py-4 text-gray-700 font-medium">
            <li>
              <a href="#" className="hover:text-blue-600 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition duration-300">
                Link
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
