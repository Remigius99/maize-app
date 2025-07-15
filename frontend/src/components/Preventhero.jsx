import React from "react";
import maizeBackground from "../assets/farmpc4.jpeg"; // Make sure this path matches your image

const Preventhero = () => {
  return (
    <div
      className="w-full h-[80vh] bg-fixed bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4 font-poppins"
      style={{ backgroundImage: `url(${maizeBackground})` }}
    >
      <div className="text-center max-w-full bg-black/60 p-4 rounded-md mt-22">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
           Maize Pests & Diseases Guide
        </h1>
        <p className="text-base md:text-lg">
          This page helps you learn about the common pests and diseases that can harm your maize crop.<br />
          You will find simple tips on how to spot early signs of problems, ways to prevent them,<br /> and easy steps to treat your maize if it gets affected.
        </p>
      </div>
    </div>
  );
};

export default Preventhero;