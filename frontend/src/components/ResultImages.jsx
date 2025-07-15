import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

// --- Analysis Popup Component ---
const AnalysisPopup = ({ analysis, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2 py-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full relative animate-fade-in overflow-y-auto max-h-[90vh] p-0 border-2 border-green-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white border border-red-500 text-red-500 rounded-full w-9 h-9 flex items-center justify-center font-bold text-lg shadow hover:bg-red-500 hover:text-white transition"
        aria-label="Close"
      >
        ×
      </button>
      <div className="p-8 pt-4">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Diagnosis Analysis & Suggestions
        </h2>
        <div className="space-y-6">
          {analysis.map((section, idx) => (
            <section
              key={idx}
              className="bg-green-50 rounded-lg p-5 shadow-sm border border-green-100"
            >
              <h3 className="text-lg font-semibold mb-2 text-green-700 text-center">
                {section.title}
              </h3>
              <div className="text-gray-800 text-justify" style={{ fontSize: 15, lineHeight: 1.7 }}>
                {section.content}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-white border border-red-500 text-red-500 px-8 py-2 rounded-lg font-semibold shadow hover:bg-red-500 hover:text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ResultsHistory = () => {
  const [data, setData] = useState([]);
  const [todayImages, setTodayImages] = useState([]);
  const [chartImages, setChartImages] = useState([]);
  const [lineChartData, setLineChartData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [popup, setPopup] = useState("");
  const [searchLabel, setSearchLabel] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisText, setAnalysisText] = useState([]);
  const itemsPerPage = 2;

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://localhost:8008/api/diagnosis-history/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("You must be logged in to view your results.");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
          filterTodayImages(data);
          setError("");
        } else {
          setData([]);
          setError(data.detail || data.error || "No results found.");
        }
      })
      .catch((err) => {
        setError("Error fetching history: " + err.message);
        setData([]);
      });
  }, [token]);

  // Helper to get YYYY-MM-DD string from a Date or timestamp
  const getDateString = (dateObj) => {
    if (!dateObj) return "";
    if (typeof dateObj === "string") {
      if (dateObj.includes("T")) return dateObj.split("T")[0];
      if (dateObj.includes(" ")) return dateObj.split(" ")[0];
      return dateObj;
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Helper to format date as "DD-MM-YYYY"
  const formatDisplayDate = (dateObj) => {
    if (!dateObj) return "";
    let d;
    if (typeof dateObj === "string") {
      d = new Date(dateObj);
    } else {
      d = dateObj;
    }
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Filter today's images and set chart data for today
  const filterTodayImages = (data) => {
    const today = new Date().toISOString().split("T")[0];
    const todayImages = data.filter((item) =>
      item.timestamp.startsWith(today)
    );
    setTodayImages(todayImages);
    setChartImages(todayImages);
    setSearchLabel("");
    setCurrentPage(1);
  };

  // Generate chart data for the given images
  const generateLineChartData = (images) => {
    if (!images || images.length === 0) {
      setLineChartData({ datasets: [] });
      return;
    }
    const diseaseTypes = {};
    const colors = [
      "rgba(75, 192, 192, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(255, 159, 64, 1)",
    ];

    images.forEach((item) => {
      const disease = item.result[0]?.disease || "Healthy";
      const confidence = item.result[0]?.confidence || 0;
      const timestamp = item.timestamp
        ? new Date(item.timestamp)
        : null;

      if (!timestamp) return;

      if (!diseaseTypes[disease]) {
        diseaseTypes[disease] = {
          label: disease,
          data: [],
          borderColor: colors[Object.keys(diseaseTypes).length % colors.length],
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderWidth: 2,
          tension: 0.4,
        };
      }

      diseaseTypes[disease].data.push({ x: timestamp, y: confidence });
    });

    setLineChartData({
      datasets: Object.values(diseaseTypes),
    });
  };

  // Update chart data whenever chartImages changes
  useEffect(() => {
    generateLineChartData(chartImages);
  }, [chartImages]);

  const handleSearch = () => {
    if (!startDate && endDate) {
      setPopup('Please enter the date in the "FROM" search bar.');
      setTimeout(() => setPopup(""), 2000);
      return;
    }

    let filtered = data;

    // Only "from" is filled: fetch data for that date
    if (startDate && !endDate) {
      const from = getDateString(startDate);
      filtered = data.filter((item) => {
        const itemDate = getDateString(item.timestamp);
        return itemDate === from;
      });
      setSearchLabel(`Diagnosed Images for ${formatDisplayDate(startDate)}`);
    }

    // Both are filled: fetch data for the interval
    if (startDate && endDate) {
      const from = getDateString(startDate);
      const to = getDateString(endDate);
      filtered = data.filter((item) => {
        const itemDate = getDateString(item.timestamp);
        return itemDate >= from && itemDate <= to;
      });
      setSearchLabel(
        `Diagnosed Images from ${formatDisplayDate(startDate)} to ${formatDisplayDate(endDate)}`
      );
    }

    // If neither is filled, show today's images and reset label
    if (!startDate && !endDate) {
      filterTodayImages(data);
      return;
    }

    setTodayImages(filtered);
    setChartImages(filtered);
    setCurrentPage(1);
  };

  const getDiseaseName = (result) => {
    if (Array.isArray(result) && result.length > 0) {
      return result[0].disease || "Unknown";
    }
    return "Healthy";
  };

  // --- Analysis Logic ---
  const getAnalysisText = () => {
    if (!chartImages || chartImages.length === 0) {
      return [
        {
          title: "No Diagnosis Data",
          content:
            "No diagnosis data available for analysis. Please diagnose your maize or select a date with diagnosis results.",
        },
        {
          title: "General Advice",
          content:
            "Early detection and action are the best ways to protect your maize. If you are new to English, don't worry—just follow the advice step by step, and ask for help from local agricultural experts if needed.",
        },
      ];
    }

    // Group confidences by disease
    const diseaseMap = {};
    chartImages.forEach((item) => {
      const disease = item.result[0]?.disease || "Healthy";
      const confidence = item.result[0]?.confidence || 0;
      if (!diseaseMap[disease]) diseaseMap[disease] = [];
      diseaseMap[disease].push(confidence);
    });

    let sections = [];
    Object.entries(diseaseMap).forEach(([disease, confidences]) => {
      if (disease === "Healthy") return;
      const first = confidences[0];
      const last = confidences[confidences.length - 1];
      let content = "";

      if (confidences.length === 1) {
        content = `The first diagnosis showed a confidence of ${first}%. This means there are signs of ${disease} in your maize. It's important to start treatment and prevention as soon as possible to avoid further spread. Follow recommended agricultural practices such as crop rotation, removing infected plants, and using appropriate fungicides or pesticides. Keep monitoring your maize regularly.`;
      } else if (last > first) {
        content = `The disease confidence increased from ${first}% to ${last}%. This suggests that "${disease}" is continuing to affect your maize more strongly. You should act quickly: apply effective treatment, improve field hygiene, and consult agricultural experts if possible. The earlier you act, the better your chances of saving your crop and reducing losses. Don't ignore the signs—prevention and timely action are key!`;
      } else if (last < first) {
        content = `The disease confidence dropped from ${first}% to ${last}%. This is a good sign! Your treatment and prevention efforts are working. Continue with your current practices, keep your field clean, and monitor your maize regularly to ensure the disease does not return. Consistency is important for long-term crop health.`;
      } else {
        content = `The disease confidence remained the same at ${first}%. This means the situation is stable, but you should continue monitoring and following prevention steps. If you want to see improvement, consider reviewing your treatment methods or seeking advice from agricultural officers.`;
      }

      sections.push({
        title: `Analysis for "${disease}"`,
        content,
      });
    });

    if (!sections.length) {
      sections.push({
        title: "All Diagnosed Images are Healthy",
        content:
          "All your diagnosed images are healthy. Keep up the good work! Continue regular monitoring and maintain good agricultural practices to prevent diseases.",
      });
    }

    sections.push({
      title: "General Advice",
      content:
        "Remember: Early detection and action are the best ways to protect your maize. If you are new to English, don't worry—just follow the advice step by step, and ask for help from local agricultural experts if needed.",
    });

    return sections;
  };

  const totalPages = Math.ceil(todayImages.length / itemsPerPage);
  const currentImages = todayImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let displayLabel = "Today's Diagnosed Images";
  if (searchLabel) {
    displayLabel = searchLabel;
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center text-green-700">
        Results History Analysis
      </h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Popup Notification */}
      {popup && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
          {popup}
        </div>
      )}

      {/* Search Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="FROM : DD-MM-YYYY"
          dateFormat="dd-MM-yyyy"
          className="px-3 py-2 border rounded min-w-[150px] sm:min-w-[170px] focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 placeholder-gray-400"
          calendarClassName="z-50"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="TO : DD-MM-YYYY"
          dateFormat="dd-MM-yyyy"
          className="px-3 py-2 border rounded min-w-[150px] sm:min-w-[170px] focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 placeholder-gray-400"
          calendarClassName="z-50"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-green-600 text-white rounded shadow-md hover:shadow-lg hover:bg-green-700 transition-transform duration-200 font-semibold"
        >
          Search
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: Diagnosed Images */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">{displayLabel}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {currentImages.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden relative group flex flex-col items-center transition-transform duration-200 hover:shadow-xl hover:scale-105"
              >
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `http://localhost:8008${
                          item.image.startsWith("/media/") ? "" : "/media/"
                        }${item.image}`
                  }
                  alt="Diagnosed"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mt-6 border-4 border-green-400"
                />
                <div className="p-4 w-full flex flex-col items-center">
                  <p className="font-semibold text-gray-800 text-center text-sm sm:text-base">
                    {getDiseaseName(item.result)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {item.timestamp
                      ? new Date(item.timestamp).toLocaleString()
                      : ""}
                  </p>
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded shadow-md transition-transform duration-200 ${
                currentPage > 1
                  ? "bg-blue-500 text-white hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            <p className="text-sm text-gray-700">
              Images {Math.min(currentPage * itemsPerPage, todayImages.length)}{" "}
              of {todayImages.length}
            </p>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded shadow-md transition-transform duration-200 ${
                currentPage < totalPages
                  ? "bg-blue-500 text-white hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Center Section: Vertical Line */}
        <div className="hidden lg:block w-px bg-gray-300"></div>

        {/* Right Section: Line Chart */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Diagnosis Rate</h2>
          {lineChartData.datasets && lineChartData.datasets.length > 0 ? (
            <>
              <Line
                data={{
                  datasets: lineChartData.datasets,
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                  scales: {
                    x: {
                      type: "time",
                      time: {
                        unit: "minute",
                        tooltipFormat: "dd-MM-yyyy HH:mm",
                        displayFormats: {
                          minute: "HH:mm",
                          hour: "HH:mm",
                          day: "dd-MM-yyyy",
                        },
                      },
                      title: {
                        display: true,
                        text: "Time",
                      },
                    },
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Confidence Percentage",
                      },
                      min: 0,
                      max: 100,
                    },
                  },
                }}
              />
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4">
                {lineChartData.datasets.map((dataset, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4"
                      style={{ backgroundColor: dataset.borderColor }}
                    ></div>
                    <span className="text-sm text-gray-700">
                      {dataset.label}
                    </span>
                  </div>
                ))}
              </div>
              {/* Analysis Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setAnalysisText(getAnalysisText());
                    setShowAnalysis(true);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 font-semibold transition"
                >
                  Analysis
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-500">No diagnosis data available.</p>
              {/* Still show Analysis button for empty state */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setAnalysisText(getAnalysisText());
                    setShowAnalysis(true);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 font-semibold transition"
                >
                  Analysis
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Popup for Viewing Details */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md md:max-w-lg relative">
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-4">
              Diagnosis Details
            </h3>
            <div className="w-full h-40 sm:h-52 bg-gray-100 rounded mb-4 overflow-hidden flex justify-center items-center">
              <img
                src={`http://localhost:8008${selectedImage.image}`}
                alt="Diagnosed"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mb-4 text-center font-semibold text-gray-800">
              Disease Detected:{" "}
              <span className="text-green-600">
                {getDiseaseName(selectedImage.result)}
              </span>
            </div>
            <div className="mb-4 text-center font-semibold text-gray-800">
              Confidence Percentage:{" "}
              <span className="text-green-600">
                {selectedImage.result[0]?.confidence || 0}%
              </span>
            </div>
            <div className="mb-4 text-center font-semibold text-gray-800">
              Diagnosed Date/Time:{" "}
              <span className="text-green-600">
                {selectedImage.timestamp
                  ? new Date(selectedImage.timestamp).toLocaleString()
                  : "Unknown"}
              </span>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 px-4 py-2 rounded-md border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300 mx-auto block"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Analysis Popup */}
      {showAnalysis && (
        <AnalysisPopup
          analysis={analysisText}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
};

export default ResultsHistory;