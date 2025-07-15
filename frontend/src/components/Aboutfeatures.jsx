import React from "react";
import { Link } from "react-router-dom";
import { FaMicroscope, FaBook, FaShieldAlt, FaChartLine } from "react-icons/fa";

const features = [
  {
    title: "AI Disease Detection",
    description:
      "Use AI to analyze maize leaf images and detect diseases like Gray Leaf Spot and Blight.",
    icon: <FaMicroscope className="text-[#00df9a] text-3xl mb-2" />,
  },
  {
    title: "Education on maize farming practices",
    description:
      "Access detailed guides on effective farming practices.",
    icon: <FaBook className="text-[#00df9a] text-3xl mb-2" />,
    link: "/education/farming-practices",
  },
  {
    title: "Prevention & Treatments",
    description:
      "Get expert tips on preventing and treating common maize diseases.",
    icon: <FaShieldAlt className="text-[#00df9a] text-3xl mb-2" />,
    link: "/education/crops-health",
  },
  {
    title: "Results Analysis",
    description:
      "See a clear analysis of your diagnosed maize images, track disease trends, and get simple advice based on your results.",
    icon: <FaChartLine className="text-[#00df9a] text-3xl mb-2" />,
    link: "/history",
  },
];

const AboutFeatures = () => {
  return (
    <section className="bg-[#e6fffa] py-10 px-4 font-poppins">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all flex flex-col items-start"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm mb-4">{feature.description}</p>
              {feature.link && (
                <Link
                  to={feature.link}
                  className="text-[#00df9a] hover:underline text-sm font-medium"
                >
                  Read more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;