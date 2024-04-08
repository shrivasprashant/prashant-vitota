import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Home from "../Home/Home";
import Shop from "../shop/Shop";
import Blog from "../blog/Blog";
import Product from "../product/Product";
import Features from "../features/Features";
import Portfolio from "../portfolio/Portfolio";
import All from "../portfolio/All";
import Register from "../authentication/Register";
import Log from "../authentication/Log";
import { useSelector } from "react-redux";
import ContactForm from "../pages/ContactForm";


const Routess = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <div>
      <Routes>
        <Route path="/home" element={user ? <Home /> : <Log />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/features" element={<Features />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/all" element={<All />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Log />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </div>
  );
};

export default Routess;
