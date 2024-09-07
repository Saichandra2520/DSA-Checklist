import React, { useState, useEffect } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false); // State to handle the mount effect

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isVisible) {
      setIsMounted(true); // Trigger the appearance animation
    }
  }, [isMobile, isVisible]);

  const handleClose = () => {
    setIsMounted(false); // Trigger the disappearance animation
    setTimeout(() => setIsVisible(false), 300); // Delay unmounting for the animation duration
  };

  if (!isMobile || !isVisible) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-custom-popup-bg bg-opacity-95 text-gray-800 px-6 py-4 rounded-lg shadow-lg w-11/12 max-w-md z-[100] flex justify-between items-center transition-all duration-300 ease-in-out ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      <p className="m-0 text-lg font-medium">
        For the best experience, please use a desktop.
      </p>
      <button
        onClick={handleClose}
        className="ml-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-300 ease-in-out"
      >
        &times;
      </button>
    </div>
  );
};

export default MobileWarning;