import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-black via-gray-900 to-black px-6 py-4 border-b border-gray-700 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left logo and title */}
        <div className="flex items-center ">
          {/* <FontAwesomeIcon icon={faRobot} className="text-white text-xl" /> */}
          {/* <h1 className="text-white text-lg md:text-2xl font-bold tracking-wide">
            HAMID AI
          </h1> */}
          <img src="./logo.svg"/>
        </div>

        {/* Optional right-side links */}
        <div className="hidden md:flex items-center gap-5 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition flex items-center gap-1">
            <FontAwesomeIcon icon={faBook} />
            Docs
          </a>
          <a href="#" className="hover:text-white transition flex items-center gap-1">
            <FontAwesomeIcon icon={faInfoCircle} />
            About
          </a>
        </div>
      </div>
    </header>
  );
}
