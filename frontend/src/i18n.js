import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navbar
      home: "Home",
      history: "Result's History",
      education: "Education",
      about: "About",

      // Analytics.jsx
      smartMaizeDetector: "Smart Maize Disease Detector",
      uploadInstruction: "Upload a maize leaf image to detect possible diseases.",
      diagnoseImage: "Diagnose the Image",
      uploadImage: "Upload Image",
      uploadedPreview: "Uploaded Preview",

      // Hero.jsx
      heroTitle: "Smart AI for Maize Health",
      detectPrevent: "Detect & Prevent with",
      aiDetection: "AI Detection",
      diseaseAwareness: "Disease Awareness",
      farmingKnowledge: "Farming Knowledge",
      heroDescription:
        "Upload images of maize leaves and instantly get diagnosis results powered by AI. Learn how to treat and prevent diseases like Blight and Gray Leaf Spot, and adapt with real-time weather insights for your region.",
      weatherError: "Failed to load weather.",
      fetchError: "Failed to fetch weather data.",
      locationError: "Location access denied. Please allow location.",
      temperature: "Temperature",
      condition: "Condition",
      cloudiness: "Cloudiness",
      loadingWeather: "Loading weather data...",

      // Cards.jsx
      treatmentPreventions: "Treatment & Preventions",
      treatmentDescription: "Learn how to identify and prevent common maize diseases using effective methods.",
      pestsDiseases: "Pests & Diseases",
      pestsDescription: "Explore common pests and diseases that affect maize and how to handle them.",
      weatherRiskManagement: "Results Analysis",
      weatherDescription: "See a clear analysis of your diagnosed maize images, track disease trends, and get simple advice based on your results.",
      cultivationTips: "Cultivation Tips",
      cultivationDescription: "Get expert tips on best maize cultivation practices for higher yield.",
      learnMore: "Learn More",
    },
  },
  sw: {
    translation: {
      // Navbar
      home: "Nyumbani",
      history: "Historia ya Matokeo",
      education: "Elimu",
      about: "Kuhusu",

      // Analytics.jsx
      smartMaizeDetector: "Kigunduzi Mahiri cha Magonjwa ya Mahindi",
      uploadInstruction: "Pakia picha ya jani la mahindi ili kugundua magonjwa yanayowezekana.",
      diagnoseImage: "Tambua Picha",
      uploadImage: "Pakia Picha",
      uploadedPreview: "Mwonekano wa Picha Iliyopakiwa",

      // Hero.jsx
      heroTitle: "AI Mahiri kwa Afya ya Mahindi",
      detectPrevent: "Tambua & Zuia kwa",
      aiDetection: "Utambuzi wa AI",
      diseaseAwareness: "Uelewa wa Magonjwa",
      farmingKnowledge: "Maarifa ya Kilimo",
      heroDescription:
        "Pakia picha za majani ya mahindi na upate matokeo ya utambuzi papo hapo yanayotokana na AI. Jifunze jinsi ya kutibu na kuzuia magonjwa kama Blight na Gray Leaf Spot, na uendane na hali ya hewa ya wakati halisi kwa eneo lako.",
      weatherError: "Imeshindikana kupakia hali ya hewa.",
      fetchError: "Imeshindikana kupata data ya hali ya hewa.",
      locationError: "Ufikiaji wa eneo umekataliwa. Tafadhali ruhusu eneo.",
      temperature: "Joto",
      condition: "Hali",
      cloudiness: "Mawingu",
      loadingWeather: "Inapakia data ya hali ya hewa...",

      // Cards.jsx
      treatmentPreventions: "Matibabu na Kinga",
      treatmentDescription: "Jifunze jinsi ya kutambua na kuzuia magonjwa ya kawaida ya mahindi kwa kutumia mbinu bora.",
      pestsDiseases: "Wadudu na Magonjwa",
      pestsDescription: "Chunguza wadudu na magonjwa ya kawaida yanayoathiri mahindi na jinsi ya kuyashughulikia.",
      weatherRiskManagement: "Hali ya Hewa na Usimamizi wa Hatari",
      weatherDescription: "Elewa jinsi hali ya hewa inavyoathiri afya ya mazao na usimamie hatari kwa ufanisi.",
      cultivationTips: "Vidokezo vya Kilimo",
      cultivationDescription: "Pata vidokezo vya wataalam juu ya mbinu bora za kilimo cha mahindi kwa mavuno mengi.",
      learnMore: "Jifunze Zaidi",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;