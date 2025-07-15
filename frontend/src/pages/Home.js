// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Hero";
import Analytics from "../components/Analytics";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Analytics />
      <Cards />
      <Footer />
    </div>
  );
};

export default Home;
