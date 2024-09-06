import React, { useEffect, useState } from 'react';
import { getHeatmapData, initializeHeatmapData } from '../../Services/progress';

// Define colors for different activity levels
const colors = {
  0: 'bg-gray-200',    // No activity
  1: 'bg-green-200',   // Very low activity
  2: 'bg-green-300',   // Low activity
  3: 'bg-green-500',   // Medium activity
  4: 'bg-green-600',   // High activity
  5: 'bg-green-700',   // Very high activity
  6: 'bg-green-800',   // Extreme activity
  // For levels greater than 6, use the same color as 6
};

// Helper function to get the first day of the month
const getFirstDayOfMonth = (monthIndex, year) => {
  return new Date(year, monthIndex, 1).getDay();
};

const Heatmap = ({ totSolvedQuestions }) => {
  const year = 2024; // Define the year for the heatmap
  const [heatmapData, setHeatmapData] = useState({}); // State to store heatmap data
  const [totalActiveDays, setTotalActiveDays] = useState(0); // State to store total active days
  const [maxStreak, setMaxStreak] = useState(0); // State to store the maximum streak of activity

  // Calculate total active days and current max streak
  const calculateActivityMetrics = (data) => {
    let activeDays = 0;
    let currentStreak = 0;
    let longestStreak = 0;

    Object.keys(data).forEach((month) => {
      const days = data[month];

      days.forEach((day) => {
        if (day > 0) {
          // If there is activity on this day
          activeDays += 1;
          currentStreak += 1;
        } else {
          // No activity on this day, reset streak
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 0;
        }
      });

      // Final streak check at the end of the month
      longestStreak = Math.max(longestStreak, currentStreak);
    });

    // Update state with calculated metrics
    setTotalActiveDays(activeDays);
    setMaxStreak(longestStreak);
  };

  // Fetch heatmap data from Localbase when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await initializeHeatmapData(); // Ensure heatmap data is initialized
      const data = await getHeatmapData(); // Fetch heatmap data
      setHeatmapData(data); // Update state with fetched data
      calculateActivityMetrics(data); // Calculate metrics based on fetched data
    };
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="p-4 bg-white mt-4 border border-black rounded-2xl" style={{ borderColor: "rgb(0,0,0,0.1)" }}>
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <p className="text-xs md:text-sm font-semibold">{totSolvedQuestions} problems completed in the past year</p>
        <div className="flex space-x-4 items-center flex-wrap">
          <div className="text-xs">
            Total active days: <span className="font-bold">{totalActiveDays}</span>
          </div>
          <div className="text-xs">
            Max streak: <span className="font-bold">{maxStreak}</span>
          </div>
          <select className="text-sm border rounded px-2 py-1">
            <option>Current</option>
          </select>
        </div>
      </div>
      <div className="flex overflow-auto gap-y-1">
        {Object.keys(heatmapData)?.map((month, monthIndex) => {
          const days = heatmapData[month]; // Get the days for the current month
          const firstDay = getFirstDayOfMonth(monthIndex, year); // Get the first day of the month
          const weeks = Array.from({ length: 6 }, () => Array(7).fill(null)); // Create a 6-week grid

          // Populate weeks with days
          days.forEach((day, index) => {
            const dayIndex = (firstDay + index) % 7;
            const weekIndex = Math.floor((firstDay + index) / 7);
            weeks[weekIndex][dayIndex] = day;
          });

          return (
            <div key={monthIndex} className="flex flex-col items-center">
              <div className="flex flex-row gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-2.5 h-2.5 ${day !== null ? (day >= 6 ? colors[6] : colors[day]) : 'bg-transparent'} rounded-sm`}
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