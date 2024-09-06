import React from "react";

const RectangularProgressBar = ({ completedProblems, TotProbs, topicName }) => {
  // Calculate the progress percentage
  const progressPercentage = (completedProblems / TotProbs) * 100;
  const progressHeight = (progressPercentage / 100) * 200; // Assuming the height of the container is 300
  const textPosition = 200 - progressHeight - 10;
  return (
    <div className="flex items-center flex-col gap-1 max-w-2 min-w-min">
      <div>
        <div className="mb-1">
          <p className="font-light text-xs">{TotProbs}</p>
        </div>
        <svg width="20" height="200" xmlns="http://www.w3.org/2000/svg">
          {/* Container with rounded corners */}
          <rect
            x="0"
            y="0"
            width="20"
            height="200"
            rx="15"
            ry="15"
            fill="#FFEACA"
            fillOpacity="0.8"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient
              id="progress-gradient"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FFA116", stopOpacity: 0.5 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#FFA116", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          {/* Progress bar with rounded corners */}
          <rect
            x="0"
            y={200 - progressHeight}
            width="20"
            height={progressHeight}
            rx="15"
            ry="15"
            fill="url(#progress-gradient)"
          />

          {/* Percentage Text */}
          <text
            x="50%"
            y={textPosition < 20 ? 20 : textPosition}
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="8"
            fill="#333"
          >
            {Math.round(progressPercentage)}%
          </text>
        </svg>
      </div>
      <div>
        <p className="text-[10px] font-normal text-center align-middle">{topicName}</p>
      </div>
    </div>
  );
};

export default RectangularProgressBar;
