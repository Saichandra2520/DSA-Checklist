import React from "react";
import CircularProgressBar from "../Tools/CircularProgressBar/CircularProgressBar";
import { useNavigate } from "react-router-dom";

// TopicsCard component to display a card for a specific topic
const TopicsCard = ({ topic }) => {
  const navigate = useNavigate();

  // Function to handle navigation to the topic's problems page
  const handleStartNow = () => {
    // Convert topic name to lowercase and remove spaces for URL-friendly navigation
    const topicId = topic.topicName.toLowerCase().split(" ").join("");
    // Navigate to the topic's problems page
    navigate(`${topicId}/problems`);
  };

  // Percentage calculation for the progress bar
  const percentage = topic?.doneQuestions
    ? Math.floor((topic?.doneQuestions / topic?.questions.length) * 100)
    : 0;

  return (
    <>
      <div>
        <div
          className="mb-6 box-border w-[330px] h-[185px] border border-black rounded-2xl flex justify-around"
          // Container styling for the topic card
        >
          <div className="topic-item-primary">
            {/* Topic information */}
            <h3 className="font-medium text-lg ml-6 mt-4">{topic?.topicName}</h3>
            <h4 className="font-normal text-sm mt-6 ml-3">
              {`Total Questions: ${topic?.questions?.length}`}
            </h4>
            <h5 className="font-normal text-sm mt-2 ml-3">
              {topic?.doneQuestions > 0
                ? `Questions solved: ${topic?.doneQuestions}`
                : 'Not yet Started'}
            </h5>
            {/* Button to navigate to the topic's problems */}
            <button
              onClick={handleStartNow}
              className="bg-black text-white text-xs font-semibold py-2 px-6 mt-4 ml-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Solve Now
            </button>
          </div>
          <div className="self-center">
            {/* Circular progress bar displaying the completion percentage */}
            <CircularProgressBar
              radius={50}
              percentage={percentage}
              color={"#faa71b"}
              progressWidth={12}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicsCard;