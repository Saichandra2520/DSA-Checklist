import React from 'react';

// Sample colors for different activity levels
const colors = {
  0: 'bg-gray-200',  // No activity
  1: 'bg-green-300', // Low activity
  2: 'bg-green-500', // Medium activity
  3: 'bg-green-700', // High activity
};

// Sample data for 2024 (example data for simplicity)
const sampleData = {
    Jan: [0, 1, 2, 3, 0, 1, 2, 0, 3, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 3, 0], // January
    Feb: [3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0], // February
    Mar: [1, 1, 2, 2, 3, 3, 1, 1, 0, 0, 2, 2, 1, 1, 3, 3, 0, 0, 1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3], // March
    Apr: [0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3], // April
    May: [1, 0, 1, 0, 3, 0, 1, 2, 0, 2, 1, 3, 0, 1, 2, 3, 0, 1, 2, 0, 3, 2, 1, 0, 1, 2, 3, 0, 1, 2], // May
    Jun: [2, 2, 2, 2, 3, 3, 0, 0, 2, 2, 1, 1, 3, 3, 0, 0, 2, 2, 1, 1, 2, 2, 3, 3, 0, 0, 2, 2, 1, 1], // June
    Jul: [3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 3, 3, 1, 1, 3, 3, 1, 1, 3, 3, 2, 2, 2, 2, 3, 3, 1, 1], // July
    Aug: [2, 3, 2, 3, 2, 3, 1, 1, 2, 3, 2, 3, 2, 3, 1, 1, 2, 3, 2, 3, 2, 3, 1, 1, 2, 3, 2, 3, 2, 3], // August
    Sep: [1, 0, 1, 0, 2, 0, 3, 3, 1, 1, 2, 2, 1, 0, 1, 0, 3, 3, 2, 2, 1, 0, 1, 0, 2, 2, 3, 3, 1, 0], // September
    Oct: [3, 2, 1, 0, 3, 2, 1, 0, 2, 2, 3, 3, 0, 0, 2, 2, 3, 3, 0, 0, 1, 1, 2, 2, 3, 3, 1, 1, 2, 2], // October
    Nov: [1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3, 0, 0, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3], // November
    Dec: [2, 0, 2, 0, 1, 3, 1, 3, 2, 0, 2, 0, 1, 3, 1, 3, 2, 0, 2, 0, 1, 3, 1, 3, 2, 0, 2, 0, 1, 3], // December
  // Add other months here
};

const getFirstDayOfMonth = (monthIndex, year) => {
  return new Date(year, monthIndex, 1).getDay();
};



const Heatmap = () => {
  const year = 2024;

  return (
    <div className="p-4 bg-white mt-4 border border-black rounded-2xl" style={{borderColor: "rgb(0,0,0,0.1)"}} >
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-semibold">27 problems completed in the past one year</p>
        <div className="flex space-x-4 items-center">
          <div className="text-xs">
            Total active days: <span className="font-bold">6</span>
          </div>
          <div className="text-xs">
            Max streak: <span className="font-bold">2</span>
          </div>
          <select className="text-sm border rounded px-2 py-1">
            <option>Current</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>
      <div className="flex overflow-auto gap-y-1">
        {Object.keys(sampleData).map((month, monthIndex) => {
          const days = sampleData[month];
          const firstDay = getFirstDayOfMonth(monthIndex, year);
          const weeks = Array.from({ length: 6 }, () => Array(7).fill(null)); // 6 weeks, 7 days each

          days.forEach((day, index) => {
            const dayIndex = (firstDay + index) % 7;
            const weekIndex = Math.floor((firstDay + index) / 7);
            weeks[weekIndex][dayIndex] = day;
          });

          return (
            <div key={monthIndex} className="flex flex-col items-center">
              <div className="flex flex-row gap-1 ">
                {weeks.map((week, weekIndex) => (    
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-2.5 h-2.5 ${day !== null ? colors[day] : 'bg-transparent'} rounded-sm`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-xs mt-1">{month}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Heatmap;