import React, { useEffect, useState, useCallback } from "react";
import LoadingOverlay from "./components/LoadingOverlay";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/Result";
import Prevent from "./pages/Prevent";
import Cultivation from "./pages/Cultivation";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  // Listen for changes in localStorage (e.g., logout from another tab)
  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Redirect to login if accessing a protected route without authentication
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleAuthChange = useCallback((auth) => {
    setIsAuthenticated(auth);
    if (auth) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Simulate loading overlay
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("loaded");
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingOverlay />;

  if (!isAuthenticated) {
    if (location.pathname !== "/") {
      return <Navigate to="/" replace />;
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100">
        <AuthForm onAuthSuccess={() => handleAuthChange(true)} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute isAuthenticated={isAuthenticated}><About /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute isAuthenticated={isAuthenticated}><History /></ProtectedRoute>} />
          <Route path="/education/crops-health" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Prevent /></ProtectedRoute>} />
          <Route path="/education/farming-practices" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Cultivation /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;