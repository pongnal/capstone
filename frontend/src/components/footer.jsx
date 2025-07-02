import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white px-8 py-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left: App details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Task Manager</h2>
          <p className="text-gray-300 mb-2">
            Tech stack use is for the frontend is vite with tailwind css and for the backend is using express.
            <br/>
            My idol is Sir Paul, so credit to him to teach me from zero to hero !
            <br/>
          </p>
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} Ahmad Zainal Abqari. All rights reserved.
          </p>
        </div>
        {/* Right: Links and Socials */}
        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-6 mb-2">
            <a href="#" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Terms</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Policy</a>
          </div>
          <div className="flex gap-4">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>

            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="hover:text-red-500 transition">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;