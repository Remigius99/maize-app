// components/UploadCard.js
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadCard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showHealthyNotice, setShowHealthyNotice] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setResults(null);
      setError(null);
    }
  };

  const handleDiagnose = async () => {
    if (!selectedFile) {
      setError(t("pleaseUploadImage"));
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    // Get JWT token from localStorage
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "http://localhost:8008/api/predict/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // <-- Send JWT token
          },
        }
      );
      setResults(response.data);
      setShowPopup(true);

      const hasHealthy = response.data.results.some((res) =>
        res.disease.toLowerCase().includes("healthy")
      );
      if (hasHealthy) {
        setShowHealthyNotice(true);
      }
    } catch (err) {
      console.error("Error diagnosing image:", err);
      setError(t("diagnosisError"));
    } finally {
      setLoading(false);
    }
  };

  const aggregateResults = results
    ? results.results.reduce((acc, cur) => {
        if (!acc[cur.disease] || acc[cur.disease] < cur.confidence) {
          acc[cur.disease] = cur.confidence;
        }
        return acc;
      }, {})
    : {};
// color indication based on confidence
  const getConfidenceColor = (conf, disease) => {
    if (disease.toLowerCase().includes("healthy")) return "bg-green-600";
    if (conf <= 40) return "bg-green-500";
    if (conf <= 70) return "bg-yellow-400";
    return "bg-red-500";
  };

  const isHealthy = Object.keys(aggregateResults).some((disease) =>
    disease.toLowerCase().includes("healthy")
  );

  return (
    <div className="w-full flex flex-col items-center px-4 py-4 bg-[#e6fffa] font-[Poppins] relative min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-6 mt-10">
        Upload Maize Leaf Image
      </h1>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-gray-100 shadow-lg rounded-xl overflow-hidden">
        <div className="w-full h-52 bg-white flex items-center justify-center relative">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={t("uploadedPreview")}
              className="object-cover w-full h-full"
            />
          ) : (
            <FaCloudUploadAlt className="text-6xl text-gray-400" />
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>

        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            {t("smartMaizeDetector")}
          </h2>
          <p className="text-sm text-gray-600">{t("uploadInstruction")}</p>

          {!selectedImage ? (
            <label className="mt-4 inline-block">
              <span className="bg-[#00df9a] text-black font-medium py-2 px-6 rounded-md cursor-pointer inline-block mt-4 drop-shadow-lg hover:scale-105">
                {t("uploadImage")}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <button
              onClick={handleDiagnose}
              disabled={loading}
              className="bg-[#00df9a] text-black font-medium py-2 px-6 rounded-md cursor-pointer inline-block mt-4 drop-shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? t("diagnosing") || "Diagnosing..." : t("diagnoseImage")}
            </button>
          )}

          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        </div>
      </div>

      {showPopup && results && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-lg relative">
            <h3 className="text-lg font-semibold text-center mb-4">
              Detection Results
            </h3>
            <div className="w-full h-52 bg-gray-100 rounded mb-4 overflow-hidden flex justify-center items-center">
              <img
                src={`http://localhost:8008${results.image_url}`}
                alt="Diagnosed"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mb-4 text-center font-semibold text-gray-800">
              Disease Detected:{" "}
              <span className="text-[#00df9a]">
                {Object.keys(aggregateResults).join(", ")}
              </span>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Area Affected:</h4>
              <div className="space-y-3">
                {Object.entries(aggregateResults).map(([disease, confidence]) => (
                  <div key={disease}>
                    <div className="flex justify-between mb-1 font-medium text-gray-700">
                      <span>{disease}</span>
                      <span>{confidence.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                      <div
                        className={`${getConfidenceColor(confidence, disease)} h-4 rounded-full transition-all duration-500`}
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`mt-6 ${
                isHealthy ? "flex justify-center" : "flex justify-between"
              }`}
            >
              {!isHealthy && (
                <button
                  onClick={() => {
                    setShowPopup(false);
                    navigate("/education/crops-health");
                  }}
                  className="bg-[#00df9a] text-black px-6 py-2 rounded hover:bg-gray-300"
                >
                  Descriptions & Recommendations
                </button>
              )}
              <button
                onClick={() => {
                  setShowPopup(false);
                  setSelectedImage(null);
                  setResults(null);
                  setSelectedFile(null);
                }}
                className="px-4 py-2 rounded-md border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showHealthyNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold text-green-700">Good News! 🎉</h2>
            <p className="text-gray-700">
              The maize leaf appears to be healthy and free from any diseases. If you'd like to
              learn more about potential maize diseases, click "Read More". Otherwise, you may
              cancel and continue.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  setShowHealthyNotice(false);
                  navigate("/education/crops-health");
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md"
              >
                Read More
              </button>
              <button
                onClick={() => {
                  setShowHealthyNotice(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center justify-center space-y-4">
            <svg
              className="animate-spin h-10 w-10 text-[#00df9a]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-white text-lg font-semibold">Diagnosing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCard;