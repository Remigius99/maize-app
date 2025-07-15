import React from "react";
import bgImage from "../assets/farmpc5.jpeg"; // Make sure this path is correct

const Cultivationhero = () => {
  return (
    <div
      className="w-full h-[80vh] bg-fixed bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-6 font-poppins"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/50 p-6 rounded-xl max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Crops Cultivation Practices
        </h1>
        <p className="text-lg md:text-xl">
          Learn the best practices for cultivating maize and ensuring a bountiful harvest.
        </p>
      </div>
    </div>
  );
};

export default Cultivationhero;
