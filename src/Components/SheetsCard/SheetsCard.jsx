import React from "react";
import CircularProgressBar from "../Tools/CircularProgressBar/CircularProgressBar";
import { useNavigate } from "react-router-dom";



const SheetsCard = ({navigateto}) => {
  const navigate = useNavigate();
  
  const handleStartNow = () => {
    if(navigateto == 'topics')
    {
      navigate(':id/topics');
    }
    else
      navigate('problems');
  };

  return (
    <>
      <div>
        <div className="mb-6 box-border w-[330px] h-[185px] border border-black rounded-2xl flex justify-around">
          <div className="topic-item-primary">
            <h3 className="font-medium text-lg ml-6 mt-4 ">Love Babbar</h3>
            <h4 className="font-normal text-sm mt-6 ml-3">
              Total Questions: 450
            </h4>
            <h5 className="font-normal text-sm mt-2 ml-3">Not Yet Started</h5>
            <button onClick={handleStartNow} className="bg-black text-white text-xs font-semibold py-2 px-6 mt-4 ml-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Start Now
            </button>
          </div>
          <div className="self-center ">
            <CircularProgressBar
              radius={50}
              percentage={25}
              color={"#faa71b"}
              progressWidth={12}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SheetsCard;
