// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cultivationhero from "../components/Cultivationhero"; // Adjust the path as necessary
import CultivationTips from "../components/CultivationTips"; // Adjust the path as necessary
const Cultivation = () => {
  return (
    <div>
      <Navbar />
      <Cultivationhero />
      <CultivationTips />
      <Footer />
    </div>
  );
};

export default Cultivation;
