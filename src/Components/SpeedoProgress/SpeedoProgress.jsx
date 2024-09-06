import React from "react";

const SpeedometerProgress = ({
  radius,
  percentage,
  color,
  progressWidth,
  bgColor,
  totQuestions,
  totSolvedQuestions
}) => {
  // Default width of the progress stroke
  const strokeWidth = progressWidth ? progressWidth : 12;
  
  // Calculate radius and circumference for the SVG circles
  const normalizedRadius = radius - strokeWidth;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Default background color and stroke color
  const bgColorReal = bgColor != null ? `${bgColor}` : "none";
  const strokeColor = bgColor != null ? `${bgColor}` : "#e5e5e5";

  // Calculate the stroke dasharray for progress indication
  const calculateDasharray = (progress) => {
    const circumference = Math.PI * radius * 2;
    return (progress / 100) * circumference;
  };

  return (
    <div className="flex w-full gap-2 h-[148px]">
      <div className="rounded-sd-sm relative flex h-full flex-1 items-center justify-center overflow-hidden bg-layer-1 dark:bg-dark-layer-1 shadow-[unset]">
        <div className="relative aspect-[1/1] w-[160px] overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[113%] w-[113%] translate-x-[-50%] translate-y-[-44%]">
            <svg
              className="absolute left-0 top-0 h-full w-full fill-transparent"
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <defs>
                <clipPath id="bar-mask">
                  <circle cx="50" cy="50" r="50" />
                </clipPath>
              </defs>
              <g clipPath="url(#bar-mask)">
                {/* Easy Level */}
                <g
                  style={{
                    transform: "rotate(225deg)",
                    transformOrigin: "center",
                  }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#e0f7fa"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="46.7287, 217.271"
                    strokeDashoffset="66"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#00acc1"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="4.08805, 259.912"
                    strokeDashoffset="66"
                  />
                </g>
                {/* Medium Level */}
                <g
                  style={{
                    transform: "rotate(296.82deg)",
                    transformOrigin: "center",
                  }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#ffecb3"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="97.3752, 166.625"
                    strokeDashoffset="66"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#ffca28"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="2.95248, 261.048"
                    strokeDashoffset="66"
                  />
                </g>
                {/* Hard Level */}
                <g
                  style={{
                    transform: "rotate(437.71deg)",
                    transformOrigin: "center",
                  }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#ffebee"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="42.0161, 221.984"
                    strokeDashoffset="66"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#e57373"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="0.511007, 263.489"
                    strokeDashoffset="66"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="absolute inset-0">
            <div className="text-sd-foreground pointer-events-none absolute left-1/2 top-[55%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 text-sm transition-opacity duration-200 opacity-100 delay-200">
              <div>
                <span className="text-[30px] font-semibold leading-[32px]">
                  {totSolvedQuestions}
                </span>
                <span>/{totQuestions}</span>
              </div>
              <div className="relative">
                <div className="text-[12px] leading-[normal] p-[1px] before:block before:h-3 before:w-3 text-sd-success absolute right-[calc(100%+2px)] top-1/2 -translate-y-1/2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="check"
                    className="svg-inline--fa fa-check absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"
                    ></path>
                  </svg>
                </div>
                Solved
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uncomment to show detailed breakdown of solved questions by difficulty level */}
      {/* <div className="flex h-full w-[90px] flex-none flex-col gap-2">
        <div className="rounded-sd-sm flex w-full flex-1 flex-col items-center justify-center gap-0.5 shadow-[unset] bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.06)]">
          <div className="text-xs font-medium text-sd-easy text-[#00acc1]">Easy</div>
          <div className="text-sd-foreground text-xs font-medium">72/823</div>
        </div>
        <div className="rounded-sd-sm flex w-full flex-1 flex-col items-center justify-center gap-0.5 shadow-[unset] bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.06)]">
          <div className="text-xs font-medium text-sd-medium text-[#ffca28]">Medium</div>
          <div className="text-sd-foreground text-xs font-medium">52/1715</div>
        </div>
        <div className="rounded-sd-sm flex w-full flex-1 flex-col items-center justify-center gap-0.5 shadow-[unset] bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.06)]">
          <div className="text-xs font-medium text-sd-hard text-[#e57373]">Hard</div>
          <div className="text-sd-foreground text-xs font-medium">9/740</div>
        </div>
      </div> */}
    </div>
  );
};

export default SpeedometerProgress;