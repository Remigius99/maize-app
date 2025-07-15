import React from "react";
import Gray from "../components/disease/Gray";
import Rust from "../components/disease/Rust";
import Blight from "../components/disease/Blight";

const Diseases = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Some common Maize Leaf Diseases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Gray />
        <Rust />
        <Blight />
      </div>
    </div>
  );
};

export default Diseases;
