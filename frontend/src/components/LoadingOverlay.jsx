// src/components/LoadingOverlay.js
import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <h1 className="text-3xl font-bold text-green-400 mb-4 drop-shadow-lg">
        SMART AI ASSISTANT
      </h1>
      <p className="mb-6 text-white drop-shadow-md">
        Detecting Maize Leaf Health...
      </p>
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
    </div>
  );
};

export default LoadingOverlay;
