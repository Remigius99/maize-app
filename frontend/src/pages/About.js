// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Aboutco from "../components/Aboutco";
import Footer from "../components/Footer";
import AboutExtra from "../components/Aboutextra";
import AboutFeatures from "../components/Aboutfeatures";


const About = () => {
  return (
    <div>
      <Navbar />
      <Aboutco />
        <AboutFeatures />
        <AboutExtra />
        <Footer />
    </div>
  );
};

export default About;
