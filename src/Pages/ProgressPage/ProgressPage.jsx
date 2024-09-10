import React, { useEffect, useState } from "react";
import ConsistencyTracker from "../../Components/ConsistencyTracker/ConsistencyTracker";
import BulbIcon from "../../assets/Bulb.svg";
import Heatmap from "../../Components/HeatMap/HeatMap";
import SpeedometerProgress from "../../Components/SpeedoProgress/SpeedoProgress";
import TopicwiseAnalytics from "../../Components/TopicWiseAnalytics/TopicwiseAnalytics";

// The ProgressPage component displays various analytics related to the user's progress
const ProgressPage = ({ consistencyPoints, currentStreak, avgProblems, sheets }) => {
  // State variables to store the total number of questions and solved questions
  const [totQuestions, setTotQuestions] = useState(0);
  const [totSolvedQuestions, setTotSolvedQuestions] = useState(0);

  // useEffect hook to accumulate the total questions and solved questions from the sheets data
  useEffect(() => {
    let totalQuestions = 0;
    let totalSolvedQuestions = 0;

    // Iterate over each sheet to sum up the total and solved questions
    sheets?.forEach((sheet) => {
      totalQuestions += sheet.totalQuestions;
      totalSolvedQuestions += sheet.solvedQuestions;
    });

    // Update state variables with the accumulated values
    setTotQuestions(totalQuestions);
    setTotSolvedQuestions(totalSolvedQuestions);
  }, [sheets]); // Dependencies: the effect will re-run whenever `sheets` changes

  console.log(sheets);

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex gap-4 flex-wrap justify-center md:justify-between sm:items-center">
        
        {/* ConsistencyTracker component displays the user's current streak and consistency points */}
        <div>
          <ConsistencyTracker currentStreak={currentStreak} consistencyPoints={consistencyPoints} />
        </div>
        
        {/* Display the average problems solved in the current month with a bulb icon */}
        <div
          className="flex flex-col justify-around items-center mt-4 box-border h-[185px] pb-8  px-4 border border-black rounded-2xl"
          style={{ borderColor: "rgb(0,0,0,0.1)" }}
        >
          <h5 className="mt-3 font-semibold text-center">
            Problems Solved <br />
            (Current Month)
          </h5>
          <div className="mt-4 flex justify-center items-center">
            <img src={BulbIcon} alt="Bulb Icon" />
            <p className="font-bold text-4xl"> {avgProblems}</p>
          </div>
        </div>
        
        {/* SpeedometerProgress component shows the user's progress in terms of problem-solving */}
        <div
          className="flex justify-around items-center mt-4 box-border h-[185px] p-8  px-4 border border-black rounded-2xl"
          style={{ borderColor: "rgb(0,0,0,0.1)" }}
        >
          <div className="lc-xl:h-[180px] min-h-[180px] w-full p-4">
            <SpeedometerProgress
              easy={200} // The total number of easy-level questions
              medium={240} // The total number of medium-level questions
              hard={300} // The total number of hard-level questions
              totalSolved={25} // The number of questions solved by the user
              totalQuestions={500} // The total number of questions available
              radius={50} // The radius of the speedometer
              percentage={25} // The percentage of questions solved
              color={"#2496EF"} // The color of the progress bar
              progressWidth={12} // The width of the progress bar
              totQuestions={totQuestions} // The accumulated total number of questions
              totSolvedQuestions={totSolvedQuestions} // The accumulated total number of solved questions
            />
          </div>
        </div>
      </div>
      
      {/* Heatmap component shows the distribution of solved questions over time */}
      <div>
        <Heatmap totSolvedQuestions={totSolvedQuestions} />
      </div>
      
      {/* TopicwiseAnalytics component displays analytics based on topics */}
      <div className="mt-6">
        <TopicwiseAnalytics sheets={sheets} />
      </div>
    </div>
  );
};

export default ProgressPage;