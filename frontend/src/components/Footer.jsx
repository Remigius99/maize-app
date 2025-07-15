import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaDribbbleSquare,
  FaGithubSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 font-[Poppins]">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-8">
        {/* Branding + Description + Socials */}
        <div>
          <h1 className="text-3xl font-bold text-[#00df9a]">Smart AI Assistant</h1>
          <p className="py-4 text-sm leading-relaxed">
            Empowering farmers with AI-driven maize leaf disease detection, real-time weather monitoring, and expert prevention tips to improve crop health and yield.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaFacebookSquare size={24} className="hover:text-[#00df9a] cursor-pointer" />
            <FaTwitterSquare size={24} className="hover:text-[#00df9a] cursor-pointer" />
            <FaInstagram size={24} className="hover:text-[#00df9a] cursor-pointer" />
            <FaDribbbleSquare size={24} className="hover:text-[#00df9a] cursor-pointer" />
            <FaGithubSquare size={24} className="hover:text-[#00df9a] cursor-pointer" />
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Features */}
          <div>
            <h6 className="font-medium text-gray-400">Features</h6>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="hover:text-[#00df9a] cursor-pointer">Disease Detection</li>
              <li className="hover:text-[#00df9a] cursor-pointer">Weather Monitoring</li>
              <li className="hover:text-[#00df9a] cursor-pointer">Education Hub</li>
              <li className="hover:text-[#00df9a] cursor-pointer">Prevention Tips</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6 className="font-medium text-gray-400">Support</h6>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="hover:text-[#00df9a] cursor-pointer">How It Works</li>
              <li className="hover:text-[#00df9a] cursor-pointer">User Guide</li>
              <li className="hover:text-[#00df9a] cursor-pointer">Ask a Question</li>
              <li className="hover:text-[#00df9a] cursor-pointer">Report a Bug</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h6 className="font-medium text-gray-400">About</h6>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="hover:text-[#00df9a] cursor-pointer">Our Mission</li>
              <li className="hover:text-[#00df9a] cursor-pointer">Meet the Developers</li>
              <li className="hover:text-[#00df9a] cursor-pointer">Final Year Project</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h6 className="font-medium text-gray-400">Resources</h6>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="hover:text-[#00df9a] cursor-pointer">Privacy Policy</li>
              <li className="hover:text-[#00df9a] cursor-pointer">Terms of Use</li>
              <li className="hover:text-[#00df9a] cursor-pointer">FAQs</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
