import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PreventionImg from "../assets/prevention2bg.png";
import PestsImg from "../assets/pest2bg.png";
import WeatherImg from "../assets/analysis.png";
import CultivationImg from "../assets/cultivation2bg.png";

const Cards = () => {
  const { t } = useTranslation();

  const cards = [
    {
      image: PreventionImg,
      title: t("treatmentPreventions"),
      description: t("treatmentDescription"),
      link: "/education/crops-health",
      bgColor: "bg-[#e6fffa]",
      buttonColor: "bg-[#00df9a]",
      textColor: "text-black",
    },
    {
      image: PestsImg,
      title: t("pestsDiseases"),
      description: t("pestsDescription"),
      link: "/education/crops-health",
      bgColor: "bg-[#e6fffa]",
      buttonColor: "bg-[#00df9a]",
      textColor: "text-black",
    },
    {
      image: WeatherImg,
      title: t("weatherRiskManagement"),
      description: t("weatherDescription"),
      link: "/history",
      bgColor: "bg-[#e6fffa]",
      buttonColor: "bg-[#00df9a]",
      textColor: "text-black",
    },
    {
      image: CultivationImg,
      title: t("cultivationTips"),
      description: t("cultivationDescription"),
      link: "/education/farming-practices",
      bgColor: "bg-[#e6fffa]",
      buttonColor: "bg-[#00df9a]",
      textColor: "text-black",
    },
  ];

  return (
    <section className="w-full py-24 px-4 bg-white font-[Poppins]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mt-[-44px]">Education Hub</h1>
        <p className="text-gray-600 mt-2">Explore tips, tools, and knowledge to improve your farming</p>
      </div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} w-full border shadow-xl flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-transform duration-300`}
          >
            <img className="w-20 mb-4" src={card.image} alt={card.title} />
            <h2 className="text-xl font-bold text-center text-black">{card.title}</h2>
            <p className="text-center text-sm py-4 text-gray-600">{card.description}</p>
            <Link
              to={card.link}
              className={`${card.buttonColor} ${card.textColor} w-[180px] hover:scale-105 text-center rounded-md font-semibold py-2 mt-auto drop-shadow-lg`}
            >
              {t("learnMore")}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
