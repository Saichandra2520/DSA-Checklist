import React from 'react';

const CircularProgressBar = ({ radius, percentage, color, progressWidth, bgColor }) => {
  const strokeWidth = progressWidth ? progressWidth : 12 ; // Width of the progress stroke
  const normalizedRadius = radius - strokeWidth; // Adjust for stroke width
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const bgColorReal = bgColor != null ? `${bgColor}` :"none";
  const strokeColor = bgColor != null ? `${bgColor}` :"#e5e5e5";

  return (
    <div className="relative flex items-center justify-center "
    style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }} >
      <svg
        width={radius * 2}
        height={radius * 2}
        className="rotate-[-90deg]" // Rotate to start from top
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        <circle
          stroke={strokeColor}
          fill= { bgColorReal}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeLinecap="round" // Rounded corners
        />
        <circle
          stroke={color}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // Rounded corners
          style={{ transition: 'stroke-dashoffset 0.35s ease' }}
        />
      </svg>
      <div className="absolute flex items-center justify-center text-lg font-semibold">
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;