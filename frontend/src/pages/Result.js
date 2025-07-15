import React from "react";
import Navbar from "../components/Navbar";
import Resultco from "../components/Resultco";
import ResultImages from "../components/ResultImages";

import Footer from "../components/Footer";

const Result = () => {
  return (
    <div>
      <Navbar />
      <Resultco/>
      <ResultImages/>
        
      <Footer />
    </div>
  );
};

export default Result;