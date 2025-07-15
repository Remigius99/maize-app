import React from "react";
import Navbar from "../components/Navbar";
import Pest from "../components/Pests";
import Footer from "../components/Footer";
import Diseases from "../components/Diseases"; // Adjust the path as necessary
import Preventhero from "../components/Preventhero"; // Adjust the path as necessary

const Home = () => {
  return (
    <div>
      <Navbar />
        <Preventhero />
        <Diseases />
        <Pest />
    
      <Footer />
    </div>
  );
};

export default Home;