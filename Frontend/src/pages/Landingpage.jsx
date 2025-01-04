import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-navy-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img src="/leetlogo.png" alt="Logo" />
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-300 hover:text-white">Premium</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Explore</a></li>
            <li className="relative">
              <button onClick={toggleDropdown} className="text-gray-300 hover:text-white focus:outline-none">
                Product
              </button>
              {isDropdownOpen && (
                <ul className="absolute bg-gray-800 text-gray-300 mt-2 rounded-md shadow-lg w-32">
                  <li><Link to="/home" className="block px-4 py-2 hover:bg-gray-700">Data Science</Link></li>
                  <li><Link to="/home" className="block px-4 py-2 hover:bg-gray-700">Lok Sewa</Link></li>
                  <li><Link to="/home" className="block px-4 py-2 hover:bg-gray-700">IELTS</Link></li>
                </ul>
              )}
            </li>
            <li><a href="#" className="text-gray-300 hover:text-white">Developer</a></li>
            <li><a href="#" className="text-white bg-red-800 px-4 py-2 rounded-md hover:bg-red-700">Sign In</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-6">Prepare for Anything You Want</h1>
            <p className="text-gray-300 mb-8">
              Enhance your skills, expand your knowledge, and prepare for technical interviews. We provide virtual AI-assisted interviews.
            </p>
            <button className="bg-red-800 text-white px-6 py-3 rounded-md hover:bg-red-700">
              Create Account
            </button>
          </div>
          <div className="relative">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex space-x-2 mb-4">
                {['#3B82F6', '#10B981', '#F59E0B', '#EF4444'].map((color, i) => (
                  <div key={i} className="w-3 h-3 rounded-full" style={{backgroundColor: color}} />
                ))}
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-white/20 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Data Science",
              description: "Explore our Data Science resources and courses.",
              icon: "📊"
            },
            {
              title: "Lok Sewa",
              description: "Prepare for Lok Sewa exams with our materials.",
              icon: "📚"
            },
            {
              title: "IELTS",
              description: "Get ready for IELTS with our comprehensive guides.",
              icon: "📝"
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-white text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="mt-2">Copyright © 2025 LeetCode</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;