import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { ReactTyped } from "react-typed"; // Correct import for named export
import BackgroundImage from "../assets/bgImage.png";

const Hero = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const { t } = useTranslation(); // Access the translation function

  useEffect(() => {
    // Step 1: Get user's geolocation
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });

        // Step 2: Fetch weather data from OpenWeatherMap API
        try {
          const apiKey = "599d4561515178b97e905dfdbdd3c0ec"; // Your API key
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
          );
          const data = await response.json();

          // Check if response contains valid data
          if (data.cod === 200) {
            setWeather(data);
          } else {
            setError(data.message || t("weatherError"));
          }
        } catch (err) {
          setError(t("fetchError"));
        }
      },
      () => {
        setError(t("locationError"));
      }
    );
  }, [t]);

  return (
    <section
      className="w-full h-screen pt-18 bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 font-poppins"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      {/* Dark overlay box with text content */}
      <div className="text-center max-w-full bg-black/60 p-6 rounded-md mt-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
          {t("heroTitle")}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
            {t("detectPrevent")}
          </p>
          <ReactTyped
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00df9a]"
            strings={[
              t("aiDetection"),
              t("diseaseAwareness"),
              t("farmingKnowledge"),
            ]}
            typeSpeed={100}
            backSpeed={120}
            loop
          />
        </div>

        <p className="text-gray-300 text-base sm:text-lg max-w-[90%] mx-auto mb-6">
          {t("heroDescription")}
        </p>

        {/* Weather Info Box */}
        <div className="bg-white bg-opacity-60 text-black w-[280px] mx-auto p-4 rounded-md shadow-md">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : weather && weather.main && weather.weather && weather.clouds ? (
            <>
              <p className="font-bold text-lg">
                {weather.name}, {weather.sys?.country}
              </p>
              <p>{t("temperature")}: {weather.main.temp}°C</p>
              <p>
                {t("condition")}: {weather.weather[0].main} (
                {weather.weather[0].description})
              </p>
              <p>{t("cloudiness")}: {weather.clouds.all}%</p>
            </>
          ) : (
            <p>{t("loadingWeather")}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;