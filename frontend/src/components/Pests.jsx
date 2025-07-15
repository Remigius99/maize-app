import React from "react";
import Borers from "../components/pests/Borer";
import FallArmyworm from "../components/pests/Armyworm";
import Aphid from "../components/pests/Aphids";
import Cutworms from "../components/pests/Cutworm";

const Pests = () => {
  return (
    <div className="relative p-6 bg-[#e6fffa] min-h-screen overflow-x-hidden mt-0 md:mt-[-74px]">
      <h1 className="text-3xl font-bold text-center mb-4 text-green-800 font-[Poppins]">
        Some Common Pests That Attack Maize Crops
      </h1>

      <p className="text-gray-700 text-center max-w-3xl mx-auto mb-8 font-[Poppins]">
        A pest is any insect or organism that damages crops, plants, food, or causes harm to humans or livestock. Identifying and managing them early is crucial for healthy maize yields.
      </p>

      {/* 4-column grid starts on medium (md) screen size */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Borers />
        <FallArmyworm />
        <Aphid />
        <Cutworms />
      </div>
    </div>
  );
};

export default Pests;
