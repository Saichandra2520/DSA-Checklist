import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import CircularProgressBar from "../../Components/Tools/CircularProgressBar/CircularProgressBar";
import SheetsWrapper from "../../Components/SheetsWrapper/SheetsWrapper";
import ConsistencyTracker from "../../Components/ConsistencyTracker/ConsistencyTracker";

// HomePage component displaying the user's progress and tasks
const HomePage = ({ sheets, consistencyPoints, currentStreak }) => {
  // Function to calculate the overall progress percentage based on solved questions
  const overrallPercentage = (sheets) => {
    let totSolved = 0;
    let totQuestions = 0;

    // Loop through each sheet to sum up the solved and total questions
    sheets?.forEach((sheet) => {
      totSolved += sheet.solvedQuestions;
      totQuestions += sheet.totalQuestions;
    });

    // Calculate and return the percentage of solved questions
    return Math.floor((totSolved / totQuestions) * 100)
      ? Math.floor((totSolved / totQuestions) * 100)
      : 0;
  };

  // UseEffect hook to calculate the overall percentage when the sheets data changes
  useEffect(() => {
    overrallPercentage(sheets);
  }, [sheets]);

  return (
    <div className="w-full">
      <div className="px-1 mx-1">
        <div
          className="mt-5"
          style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
        >
          {/* Left side: Generalized message and SheetsWrapper component */}
          <div className="mt-10 px-8 md:px-16">
            <div>
              <h3 className="font-semibold">
                Welcome to the DSA Sheets Practice Hub!
              </h3>
              <p className="text-sm mt-1">
                Dive into your progress and explore the topics to enhance your
                skills.
              </p>
            </div>
            <div className="mt-10 mb-10 p-0">
              <SheetsWrapper navigateto="topics" sheets={sheets} />
            </div>
          </div>

          {/* Right side: Overall Progress and Consistency Tracker */}
          <div className="hidden sm:flex flex-col">
            <div>
              <h3 className="font-semibold mt-5">Overall Progress</h3>

              {/* CircularProgressBar component showing the overall progress percentage */}
              <CircularProgressBar
                radius={100}
                percentage={overrallPercentage(sheets)}
                color={"#faa71b"}
                progressWidth={24}
              />

              {/* Legend for the progress categories */}
              <div>
                <div className="flex flex-wrap mt-2">
                  <div className="w-1/2">
                    <div className="flex items-center mb-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full mr-2"
                        style={{ backgroundColor: "#2496EF" }}
                      ></span>
                      <p className="cursor-pointer">Overall</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                      <p className="cursor-pointer">Arrays</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
                      <p className="cursor-pointer">Strings</p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center mb-2">
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-2"></span>
                      <p className="cursor-pointer">Linked Lists</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="w-2.5 h-2.5 bg-purple-500 rounded-full mr-2"></span>
                      <p className="cursor-pointer">Graphs</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2"></span>
                      <p className="cursor-pointer">Dynamic Programming</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ConsistencyTracker component showing current streak and consistency points */}
            <div><ConsistencyTracker
              consistencyPoints={consistencyPoints}
              currentStreak={currentStreak}
            /></div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
