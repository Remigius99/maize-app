import React, { useState, useEffect } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const REGISTER_API = "http://localhost:8008/api/register/";
const LOGIN_API = "http://localhost:8008/api/login/";

export default function AuthForm({ onAuthSuccess }) {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [regFullname, setRegFullname] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errors, setErrors] = useState({
    regFullname: false,
    regEmail: false,
    regPassword: false,
    regRole: false,
    loginUsername: false,
    loginPassword: false,
  });
  const [fieldErrors, setFieldErrors] = useState({
    regFullname: "",
    regEmail: "",
    regPassword: "",
    regRole: "",
    loginUsername: "",
    loginPassword: "",
  });

  // State to block form while waiting, but no "Redirecting..." word
  const [waiting, setWaiting] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Get password validation error message
  const getPasswordError = (password) => {
    if (!password) return "This field is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must contain a lowercase letter";
    if (!/\d/.test(password)) return "Must contain a number";
    if (!/[!@#$%^&*]/.test(password)) return "Must contain a special character";
    return "";
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setRegPassword(password);

    if (errors.regPassword || e.type === "blur") {
      const error = getPasswordError(password);
      setFieldErrors((prev) => ({ ...prev, regPassword: error }));
      setErrors((prev) => ({ ...prev, regPassword: !!error }));
    }
  };

  // Validate all fields before submission
  const validateFields = (formType) => {
    let isValid = true;
    const newErrors = { ...errors };
    const newFieldErrors = { ...fieldErrors };

    if (formType === "register") {
      if (!regFullname.trim()) {
        newErrors.regFullname = true;
        newFieldErrors.regFullname = "This field is required";
        isValid = false;
      } else {
        newErrors.regFullname = false;
        newFieldErrors.regFullname = "";
      }

      if (!regEmail.trim()) {
        newErrors.regEmail = true;
        newFieldErrors.regEmail = "This field is required";
        isValid = false;
      } else if (!validateEmail(regEmail)) {
        newErrors.regEmail = true;
        newFieldErrors.regEmail = "Please enter a valid email";
        isValid = false;
      } else {
        newErrors.regEmail = false;
        newFieldErrors.regEmail = "";
      }

      const passwordError = getPasswordError(regPassword);
      if (passwordError) {
        newErrors.regPassword = true;
        newFieldErrors.regPassword = passwordError;
        isValid = false;
      } else {
        newErrors.regPassword = false;
        newFieldErrors.regPassword = "";
      }

      if (!regRole) {
        newErrors.regRole = true;
        newFieldErrors.regRole = "This field is required";
        isValid = false;
      } else {
        newErrors.regRole = false;
        newFieldErrors.regRole = "";
      }
    } else {
      if (!loginUsername.trim()) {
        newErrors.loginUsername = true;
        newFieldErrors.loginUsername = "This field is required";
        isValid = false;
      } else if (!validateEmail(loginUsername)) {
        newErrors.loginUsername = true;
        newFieldErrors.loginUsername = "Please enter a valid email";
        isValid = false;
      } else {
        newErrors.loginUsername = false;
        newFieldErrors.loginUsername = "";
      }

      if (!loginPassword) {
        newErrors.loginPassword = true;
        newFieldErrors.loginPassword = "This field is required";
        isValid = false;
      } else {
        newErrors.loginPassword = false;
        newFieldErrors.loginPassword = "";
      }
    }

    setErrors(newErrors);
    setFieldErrors(newFieldErrors);
    return isValid;
  };

  // SweetAlert2 notification helper
  const showSwal = (type, text) => {
    Swal.fire({
      icon: type,
      title: text,
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      position: "top",
      width: 350,
      customClass: {
        popup: "swal2-responsive-popup",
        title: "swal2-responsive-title",
      },
    });
  };

  // LOGIN SUBMIT
  async function handleLoginSubmit(e) {
    e.preventDefault();

    if (!validateFields("login")) return;

    setWaiting(false);
    try {
      const res = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginUsername,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showSwal("success", "Successful login!!");
        setWaiting(true);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userFullName", data.user.full_name);
        localStorage.setItem("accessToken", data.access);
        setTimeout(() => {
          setWaiting(false);
          if (onAuthSuccess) onAuthSuccess(data);
        }, 1200);
      } else {
        showSwal("error", data.error || data.detail || "Invalid email or password");
      }
    } catch (err) {
      showSwal("error", "Login failed: " + err.message);
    }
  }

  // REGISTER SUBMIT
  async function handleRegisterSubmit(e) {
    e.preventDefault();

    if (!validateFields("register")) return;

    setWaiting(false);
    try {
      const res = await fetch(REGISTER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: regEmail,
          password: regPassword,
          full_name: regFullname,
          role: regRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (
          data.email &&
          data.email[0] === "user with this email already exists."
        ) {
          setErrors((prev) => ({ ...prev, regEmail: true }));
          setFieldErrors((prev) => ({
            ...prev,
            regEmail: "Email already exists",
          }));
          showSwal("error", "This email is already registered");
        } else {
          showSwal("error", data.error || JSON.stringify(data));
        }
      } else {
        showSwal("success", "Registration successful! Please login.");
        setWaiting(true);
        setRegFullname("");
        setRegEmail("");
        setRegPassword("");
        setRegRole("");
        setTimeout(() => {
          setWaiting(false);
          setIsRegisterActive(false);
        }, 1200);
      }
    } catch (err) {
      showSwal("error", "Registration failed: " + err.message);
    }
  }

  useEffect(() => {
    setErrors({
      regFullname: false,
      regEmail: false,
      regPassword: false,
      regRole: false,
      loginUsername: false,
      loginPassword: false,
    });
    setFieldErrors({
      regFullname: "",
      regEmail: "",
      regPassword: "",
      regRole: "",
      loginUsername: "",
      loginPassword: "",
    });
    // No need to clear SweetAlert here
  }, [isRegisterActive]);

  return (
    <div className="flex flex-col items-center mt-6 font-poppins">
      {/* Main Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-green-700">
          SMART AI Assistant for Maize Leaf Disease Detection
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Empowering Farmers with Fast, Accurate Crop Health Diagnosis
        </p>
      </div>

      {/* Overlay to block interaction while waiting */}
      {waiting && (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50"></div>
      )}

      {/* Auth Form Box */}
      <div className="relative w-[650px] max-w-full h-[350px] bg-white rounded-[20px] shadow-lg overflow-hidden m-4 text-sm">
        {/* Register Form */}
        <div
          className={`absolute top-0 h-full w-1/2 flex flex-col justify-center items-center text-center px-3 py-4 text-gray-800 transition-all duration-700 ease-in-out z-10 ${
            isRegisterActive ? "left-0" : "-left-1/2"
          }`}
          style={{ transitionDelay: isRegisterActive ? "0.6s" : "0s" }}
        >
          <form className="w-full max-w-[90%]" onSubmit={handleRegisterSubmit}>
            <h1 className="text-xl mb-2 font-bold text-green-800">Register</h1>
            <div className="flex flex-col gap-3.5">
              <div className="relative">
                <input
                  type="text"
                  value={regFullname}
                  onChange={(e) => setRegFullname(e.target.value)}
                  required
                  placeholder=" "
                  className={`w-full px-3 pt-2 pb-1 border ${
                    errors.regFullname ? "border-red-500" : "border-gray-400"
                  } rounded-md outline-none text-gray-700 focus:border-green-500 peer text-sm`}
                />
                <label className="absolute left-2 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500">
                  Full name *
                </label>
                {errors.regFullname && (
                  <p className="text-red-500 text-xs text-left mt-1">
                    {fieldErrors.regFullname}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  placeholder=" "
                  className={`w-full px-3 pt-2 pb-1 border ${
                    errors.regEmail ? "border-red-500" : "border-gray-400"
                  } rounded-md outline-none text-gray-700 focus:border-green-500 peer text-sm`}
                />
                <label className="absolute left-2 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500">
                  Email *
                </label>
                {errors.regEmail && (
                  <p className="text-red-500 text-xs text-left mt-1">
                    {fieldErrors.regEmail}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type={showRegPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={handlePasswordChange}
                  onBlur={() => {
                    const error = getPasswordError(regPassword);
                    setFieldErrors((prev) => ({ ...prev, regPassword: error }));
                    setErrors((prev) => ({ ...prev, regPassword: !!error }));
                  }}
                  required
                  placeholder=" "
                  className={`w-full px-3 pt-2 pb-1 pr-10 border ${
                    errors.regPassword ? "border-red-500" : "border-gray-400"
                  } rounded-md outline-none text-gray-700 focus:border-green-500 peer text-sm`}
                />
                <label className="absolute left-2 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500">
                  Password *
                </label>
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-green-500"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                >
                  {showRegPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.regPassword && (
                  <p className="text-red-500 text-xs text-left mt-1">
                    {fieldErrors.regPassword}
                  </p>
                )}
              </div>
              <div className="relative">
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  required
                  className={`w-full px-3 pt-2 pb-1 border ${
                    errors.regRole ? "border-red-500" : "border-gray-400"
                  } rounded-md outline-none text-gray-700 focus:border-green-500 peer appearance-none text-sm`}
                >
                  <option value="" disabled hidden></option>
                  <option value="farmer">Farmer</option>
                  <option value="research">Researchers & Students</option>
                  <option value="officer">Agricultural Officers</option>
                  <option value="ngo">NGOs / Agri-Tech</option>
                  <option value="other">Others</option>
                </select>
                <label className="absolute left-2 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500">
                  Role *
                </label>
                {errors.regRole && (
                  <p className="text-red-500 text-xs text-left mt-1">
                    {fieldErrors.regRole}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-3 w-full h-9 bg-green-500 rounded-md text-white font-semibold hover:bg-green-600 transition-colors"
              disabled={waiting}
            >
              Register
            </button>
            <p className="my-2 text-xs">or sign up with</p>
            <div className="flex justify-center gap-3 text-lg text-gray-800">
              <FaGoogle className="hover:text-green-500 cursor-pointer" />
              <FaFacebookF className="hover:text-green-500 cursor-pointer" />
              <FaGithub className="hover:text-green-500 cursor-pointer" />
              <FaLinkedinIn className="hover:text-green-500 cursor-pointer" />
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div
          className={`absolute top-0 h-full w-1/2 flex flex-col justify-center items-center text-center px-3 py-4 text-gray-800 transition-all duration-700 ease-in-out z-10 ${
            isRegisterActive ? "right-[-50%]" : "right-0"
          }`}
          style={{ transitionDelay: isRegisterActive ? "0s" : "0.6s" }}
        >
          <form className="w-full max-w-[90%]" onSubmit={handleLoginSubmit}>
            <h1 className="text-2xl mb-2 font-bold text-green-800">Login</h1>
            <p className="text-xs text-gray-800 mb-2">
              Enter your credentials to continue
            </p>
            <div className="relative mt-3">
              <input
                type="email"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                placeholder=" "
                className={`w-full px-3 pt-2 pb-1 border ${
                  errors.loginUsername ? "border-red-500" : "border-gray-400"
                } rounded-md outline-none text-gray-700 focus:border-green-500 peer text-sm`}
              />
              <label className="absolute left-2 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500">
                Email *
              </label>
              {errors.loginUsername && (
                <p className="text-red-500 text-xs text-left mt-1">
                  {fieldErrors.loginUsername}
                </p>
              )}
            </div>
            <div className="relative mt-3">
              <input
                type={showLoginPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                placeholder=" "
                className={`w-full px-3 pt-2 pb-1 pr-10 border ${
                  errors.loginPassword ? "border-red-500" : "border-gray-400"
                } rounded-md outline-none text-gray-700 focus:border-green-500 peer text-sm`}
              />
              <label className="absolute left-2 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500">
                Password *
              </label>
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-green-500"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.loginPassword && (
                <p className="text-red-500 text-xs text-left mt-1">
                  {fieldErrors.loginPassword}
                </p>
              )}
            </div>
            <a
              href="#"
              className="text-xs text-gray-800 hover:underline mt-2 block"
            >
              Forgot Password?
            </a>
            <button
              type="submit"
              className="mt-2 w-full h-9 bg-green-500 rounded-md text-white font-semibold hover:bg-green-600 transition-colors"
              disabled={waiting}
            >
              Login
            </button>
            <p className="my-2 text-xs">or login with</p>
            <div className="flex justify-center gap-3 text-lg text-gray-800">
              <FaGoogle className="hover:text-green-500" />
              <FaFacebookF className="hover:text-green-500" />
              <FaGithub className="hover:text-green-500" />
              <FaLinkedinIn className="hover:text-green-500" />
            </div>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none text-sm">
          <div
            className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white bg-green-500 rounded-r-[40px] transition-all duration-700 ease-in-out ${
              isRegisterActive ? "-left-1/2 opacity-0" : "left-0 opacity-100"
            }`}
            style={{ transitionDelay: isRegisterActive ? "0s" : "0.6s" }}
          >
            <h1 className="text-2xl mb-1">Hello!</h1>
            <p className="mb-3">Don't have an account?</p>
            <button
              className="w-[120px] h-[34px] border border-white rounded bg-transparent text-white font-medium hover:bg-white hover:text-green-500 transition-colors pointer-events-auto"
              onClick={() => setIsRegisterActive(true)}
            >
              Register
            </button>
          </div>
          <div
            className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white bg-green-500 rounded-l-[40px] transition-all duration-700 ease-in-out ${
              isRegisterActive
                ? "right-0 opacity-100"
                : "right-[-50%] opacity-0"
            }`}
            style={{ transitionDelay: isRegisterActive ? "0.6s" : "0s" }}
          >
            <h1 className="text-2xl mb-1">Welcome Back!</h1>
            <p className="mb-3">Already have an account?</p>
            <button
              className="w-[120px] h-[34px] border border-white rounded bg-transparent text-white font-medium hover:bg-white hover:text-green-500 transition-colors pointer-events-auto"
              onClick={() => setIsRegisterActive(false)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}