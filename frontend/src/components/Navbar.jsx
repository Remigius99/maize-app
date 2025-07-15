import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Sidelogo from "../assets/imagesco.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [eduDropdown, setEduDropdown] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "Unknown";
  const userFullName = localStorage.getItem("userFullName") || "Unknown";
  const userRole = localStorage.getItem("userRole") || "Unknown";
  const location = useLocation();
  const navigate = useNavigate();
  const isEducationActive = location.pathname.startsWith("/education");

  const eduDropdownRef = useRef();
  const userPopupRef = useRef();

  const handleNav = () => setNav((prev) => !prev);
  const toggleEduDropdown = () => setEduDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userPopupRef.current &&
        !userPopupRef.current.contains(event.target)
      ) {
        setShowUser(false);
      }
    };
    if (showUser) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUser]);

  useEffect(() => {
    setNav(false);
    setEduDropdown(false);
    setShowUser(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("accessToken");
    setShowUser(false);
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <header className="bg-black/80 backdrop-blur-md text-white drop-shadow-lg fixed top-0 w-full z-50 font-poppins">
      <div className="flex justify-between items-center h-20 px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <img src={Sidelogo} className="w-10 h-10" alt="Logo" />
          <h1 className="text-xl md:text-2xl font-bold text-[#00df9a] font-azonix">
            Smart Farming Assistant
          </h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-2 border-[#00df9a] px-2 py-1 rounded text-[#00df9a]"
                : "hover:text-[#00df9a]"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? "border-2 border-[#00df9a] px-2 py-1 rounded text-[#00df9a]"
                : "hover:text-[#00df9a]"
            }
          >
            Result's History
          </NavLink>

          <div className="relative" ref={eduDropdownRef}>
            <button
              onClick={toggleEduDropdown}
              className={`px-2 py-1 rounded ${
                isEducationActive
                  ? "border-2 border-[#00df9a] text-[#00df9a]"
                  : "hover:text-[#00df9a]"
              }`}
            >
              Education
            </button>
            {eduDropdown && (
              <div className="absolute top-8 left-0 bg-white text-black rounded shadow-lg z-50">
                <NavLink
                  to="/education/crops-health"
                  className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                  onClick={() => setEduDropdown(false)}
                >
                  Treatment & Prevention
                </NavLink>
                <NavLink
                  to="/education/farming-practices"
                  className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                  onClick={() => setEduDropdown(false)}
                >
                  Farming Practices
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "border-2 border-[#00df9a] px-2 py-1 rounded text-[#00df9a]"
                : "hover:text-[#00df9a]"
            }
          >
            About
          </NavLink>

          {/* User icon */}
          <button
            className="text-2xl text-[#00df9a] hover:text-green-400 ml-6"
            onClick={() => setShowUser((prev) => !prev)}
            title="View Profile"
          >
            <FaUserCircle />
          </button>
          {showUser && (
            <div
              ref={userPopupRef}
              className="absolute top-14 right-0 bg-white text-black rounded-xl shadow-lg p-4 z-50 border border-green-200 min-w-[240px] flex flex-col items-center"
            >
              <FaUserCircle className="text-4xl text-green-700 mb-2" />
              <div className="font-bold text-green-700 mb-1">
                Name: <span className="font-normal text-black">{userFullName}</span>
              </div>
              <div className="text-xs text-gray-700 mb-1">
                Role: <span className="font-normal text-black">{userRole}</span>
              </div>
              <div className="text-xs text-gray-700 mb-3">
                Email: <span className="font-normal text-black">{userEmail}</span>
              </div>
              <button
                className="text-sm text-[#00df9a] hover:text-green-400 px-2 py-1 rounded flex items-center"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="inline mr-1" /> Logout
              </button>
            </div>
          )}
        </nav>

        {/* Mobile controls */}
        <div className="relative flex items-center gap-4 md:hidden">
          <button
            className="text-2xl text-[#00df9a] hover:text-green-400"
            onClick={() => setShowUser((prev) => !prev)}
            title="View Profile"
          >
            <FaUserCircle />
          </button>
          <div onClick={handleNav} className="cursor-pointer">
            {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </div>
        </div>
      </div>

      {/* User popup for mobile */}
      {showUser && (
        <div
          ref={userPopupRef}
          className="fixed top-20 right-8 bg-white rounded-xl shadow-lg p-6 z-50 border border-green-200 min-w-[260px] flex flex-col items-center"
        >
          <FaUserCircle className="text-5xl text-green-700 mb-2" />
          <div className="font-bold text-green-700 mb-1">
            Name: <span className="font-normal text-black">{userFullName}</span>
          </div>
          <div className="text-xs text-gray-700 mb-1">
            Role: <span className="font-normal text-black">{userRole}</span>
          </div>
          <div className="text-xs text-gray-700 mb-3">
            Email: <span className="font-normal text-black">{userEmail}</span>
          </div>
          <button
            className="text-sm text-[#00df9a] hover:text-green-400 px-2 py-1 rounded flex items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="inline mr-1" /> Logout
          </button>
          <button
            className="mt-2 px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700 w-full"
            onClick={() => setShowUser(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Mobile nav */}
      {nav && (
        <div className="md:hidden fixed top-20 left-0 bg-black/90 w-[70%] px-6 py-4 space-y-4 text-white z-40">
          <NavLink
            to="/"
            onClick={handleNav}
            className={({ isActive }) =>
              isActive
                ? "block text-[#00df9a] underline"
                : "block hover:text-[#00df9a]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/history"
            onClick={handleNav}
            className={({ isActive }) =>
              isActive
                ? "block text-[#00df9a] underline"
                : "block hover:text-[#00df9a]"
            }
          >
            Result's History
          </NavLink>
          <div className="relative">
            <button
              onClick={toggleEduDropdown}
              className={`px-2 py-1 ${
                isEducationActive
                  ? "block text-[#00df9a] underline"
                  : "block hover:text-[#00df9a]"
              }`}
            >
              Education
            </button>
            {eduDropdown && (
              <div className="pl-4">
                <NavLink
                  to="/education/crops-health"
                  className="block hover:text-[#00df9a]"
                  onClick={() => setEduDropdown(false)}
                >
                  &gt; Treatments & Preventions
                </NavLink>
                <NavLink
                  to="/education/farming-practices"
                  className="block hover:text-[#00df9a]"
                  onClick={() => setEduDropdown(false)}
                >
                  &gt; Farming Practices
                </NavLink>
              </div>
            )}
          </div>
          <NavLink
            to="/about"
            onClick={handleNav}
            className={({ isActive }) =>
              isActive
                ? "block text-[#00df9a] underline"
                : "block hover:text-[#00df9a]"
            }
          >
            About
          </NavLink>
          {userEmail !== "Unknown" && (
            <button
              className="w-full text-left text-[#00df9a] hover:text-green-400 mt-4 flex items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="inline mr-1" /> Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
