import React from "react";
import BackgroundImage from "../assets/farmpc3.jpeg";

const Aboutco = () => {
  return (
    <section
      className="w-full h-screen bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 font-poppins"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      {/* Container with overlay and content */}
      <div className="relative max-w-4xl w-full p-8 rounded-md z-10">
        {/* Background overlay only around content */}
        <div className="absolute inset-0 bg-black/60 rounded-md z-0"></div>

        {/* Content on top of overlay */}
        <div className="max-w-4xl mx-auto text-center relative z-10 p-6 text-white">
          {/* Merged Heading with Typed Text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Our App
  
          </h1>

          {/* Description */}
          <p className="text-lg mt-4 text-white">
            The Smart AI Assistant for Maize Disease Detection is a Progressive Web App built to empower farmers by detecting diseases like Gray Leaf Spot and Corn Blight using AI technology. It aims to enhance food security by improving maize crop health and yield through technology and accessible knowledge.
          </p>
        </div>
      </div> 
    </section>
  );
};

export default Aboutco;
