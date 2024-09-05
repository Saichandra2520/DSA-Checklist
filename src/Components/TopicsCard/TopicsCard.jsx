import React from "react";
import CircularProgressBar from "../Tools/CircularProgressBar/CircularProgressBar";
import { useNavigate } from "react-router-dom";



const TopicsCard = ({topic}) => {
  const navigate = useNavigate();
  
  const handleStartNow = () => {
     const topicId = topic.topicName.toLowerCase().split(" ").join("");
      navigate(`${topicId}/problems`)
  };

   //Percentage Calculation
   const percentage = topic?.doneQuestions ? Math.floor((topic?.doneQuestions / topic?.questions.length) * 100) : 0;


  return (
    <>
      <div>
        <div className="mb-6 box-border w-[330px] h-[185px] border border-black rounded-2xl flex justify-around">
          <div className="topic-item-primary">
            <h3 className="font-medium text-lg ml-6 mt-4 ">{topic?.topicName}</h3>
            <h4 className="font-normal text-sm mt-6 ml-3">
              {`Total Questions: ${topic?.questions?.length}`}
            </h4>
            <h5 className="font-normal text-sm mt-2 ml-3">{topic?.doneQuestions > 0 ? `Questions solved: ${topic?.doneQuestions}`: 'Not yet Started'}</h5>
            <button onClick={handleStartNow} className="bg-black text-white text-xs font-semibold py-2 px-6 mt-4 ml-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Solve Now
            </button>
          </div>
          <div className="self-center ">
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
