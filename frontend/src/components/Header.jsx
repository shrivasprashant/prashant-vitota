import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { IoCall } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import vitotaLogo from "../assets/image/vitotoa__logo.png";
import { Link, NavLink } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/instance";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../redux/userSlice";


const Header = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {

      const storedUserData = localStorage.getItem("user");
      const userData = JSON.parse(storedUserData);
      const token = userData.token;

      await axios.get(`${USER_API_END_POINT}/user/signout`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logoutuser());
      localStorage.removeItem("user");
      console.log("User  signout suecssfully");

      navigate("/login");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const [toggle, settoggle] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const closeDroptime = () => {
    timeoutId = setTimeout(() => {
      setIsOn(false);
    }, 100); // Adjust the delay time (in milliseconds) as needed
  };

  const openDropdown = () => {
    clearTimeout(timeoutId);
    setIsOn(true);
  };

  const closeDrop = () => {
    closeDroptime(); // Start the timeout when mouse leaves
  };




  let timeoutId; // Declare timeoutId variable outside the function scope

  const closeDropdown = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Adjust the delay time (in milliseconds) as needed
  };

  const onMouseEnterDropdown = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const onMouseLeaveDropdown = () => {
    closeDropdown(); // Start the timeout when mouse leaves
  };



  return (
    <div className="bg-[#FFFFFF] relative z-10">
      <div className="hidden md:flex justify-between px-[100px] py-2 bg-[#F8F8F8]  ">
        <div className="flex gap-6">
          <h5 className="text-sm">Announce something here</h5>
          <h5 className="text-sm">
            <IoCall className="inline-block mr-1 text-pink-400" /> CALL US:
            +918319384910
          </h5>
        </div>
        <div className="flex gap-3 text-sm text-[#9e9d9d]">
          <h5>
            {" "}
            <FaHeart className="inline-block mr-1 text-pink-400" /> Wishlist{" "}
          </h5>
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDrop}
          >
            <h5>
              <MdAccountCircle className="inline-block mr-1 text-pink-400" /> My
              Account <IoIosArrowDown className="inline-block" />
            </h5>
            {isOn && (
              <div className="absolute z-10 mt-2 w-32 text-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    to="/login"
                    className="block  px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Signin
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleSignout} className="text-red-00">
            {user ? "signout" : " "}
          </button>
        </div>
      </div>
      <div className="max-w-full py-3 flex items-center justify-between px-2  md:px-[100px] ">
        <div className="logo">
          <img className="w-[100px] md:w-[200px]" src={vitotaLogo} alt="" />
        </div>
        <div className="links">

          <div className='hidden md:flex gap-14 capitalize text-lg'>
            <NavLink className={(e) => (e.isActive ? "text-black font-bold " : "text-black ")} to="/home">home</NavLink>
            <NavLink className={(e) => (e.isActive ? "text-black font-bold" : "text-black")} to="/shop">shop</NavLink>
            <NavLink className={(e) => (e.isActive ? "text-black font-bold" : "text-black")} to="/product">product</NavLink>
            <NavLink className={(e) => (e.isActive ? "text-black font-bold" : "text-black")} to="/features">features</NavLink>
            <div className="relative" onMouseEnter={onMouseEnterDropdown} onMouseLeave={onMouseLeaveDropdown}>
              <NavLink className={(e) => (e.isActive ? "text-black font-bold" : "text-black")} to="/about">pages</NavLink>
              {isOpen && (
                <div className="absolute z-[99999] mt-2 w-32 text-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onMouseEnter={onMouseEnterDropdown} onMouseLeave={onMouseLeaveDropdown}>
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link to="/about" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">About us</Link>
                    <Link to="/contact" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Contact Us</Link>
                    <Link to="/faq" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Faq</Link>
                    <Link to="/portfolio" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Portfolio</Link>
                    <Link to="/search" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Search</Link>
                    <Link to="/wishlist" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Wishlist</Link>
                    <Link to="/lookbook" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">LookBook</Link>
                  </div>
                </div>
              )}
            </div>
            <NavLink className={(e) => (e.isActive ? "text-black font-bold" : "text-black")} to="/blog">blog</NavLink>
          </div>
          {/* responsive */}
          <ul className={`md:hidden duration-300 fixed z-10 capitalize w-[60%] h-screen bg-[white] text-black top-[70px] md:top-[150px] ${toggle ? 'left-0' : 'left-[-100%]'}`}>
            <li className='p-5'>home</li>
            <li className='p-5'>shop</li>
            <li className='p-5'>product</li>
            <li className='p-5'>features</li>
            <li className='p-5'>pages</li>
            <li className='p-5'>blog</li>
          </ul>
        </div>
        <div className="flex items-center justify-center text-2xl gap-3">
          <CiSearch />
          <IoSettingsOutline />
          <CiShoppingBasket />
          {toggle ? (<IoClose onClick={() => settoggle(!toggle)}
            className="text-black text-2xl md:hidden block"
          />
          ) : (
            <AiOutlineMenu
              onClick={() => settoggle(!toggle)}
              className="text-black text-2xl md:hidden block"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;













// setTimeout(() => {
//   // Retrieve the token from local storage
//   // const token = response.data.token;
//   // console.log("this is token hello", token);
//   const storedUserData = localStorage.getItem("user");

//   // Parse the stored response data string into an object
//   const userData = JSON.parse(storedUserData);

//   // Access the token property from the parsed object
//   const token = userData.token;

//   console.log("Retrieved token from local storage:", token);
// }, 100);