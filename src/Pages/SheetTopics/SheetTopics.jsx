import React, { useEffect, useState } from 'react';
import CircularProgressBar from '../../Components/Tools/CircularProgressBar/CircularProgressBar';
import ConsistencyTracker from '../../Components/ConsistencyTracker/ConsistencyTracker';
import TopicsWrapper from '../../Components/TopicsWrapper/TopicsWrapper';
import { useParams } from 'react-router-dom';
import { getTopicData } from '../../Services/service';

// The SheetTopics component displays details and progress of a specific sheet, including topics and progress metrics
const SheetTopics = ({ sheets, reload, currentStreak, consistencyPoints }) => {
  const { sheetId } = useParams(); // Extract the sheetId from the URL parameters
  const [sheet, setSheet] = useState({}); // State to store sheet data

  // Fetch the sheet data when the component mounts or when `reload` changes
  useEffect(() => {
    getTopicData(sheetId, sheetId, (data) => {
      setSheet(data);
    });
  }, [reload, sheetId]);

  // Percentage Calculation for the CircularProgressBar
  let percentage = sheet?.totalQuestions ? Math.floor((sheet.solvedQuestions / sheet.totalQuestions) * 100) : 0;

  // Load sheet data from the `sheets` array based on the `sheetId`
  const loadData = (sheets) => {
    const temp = sheets?.find((s) => s.id === sheetId);
    setSheet(temp);
  };

  // UseEffect to load sheet data when `sheets` or `sheetId` changes
  useEffect(() => {
    loadData(sheets);
  }, [sheetId, sheets]);

  return (
    <div className='flex justify-center items-center w-[75vw] flex-wrap m-auto'>
      <div className='flex gap-3 flex-wrap w-full m-auto justify-around'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='font-bold text-xl'>{sheet?.sheetName} DSA Sheet</h2>
          <p>Author: {sheet?.author}</p>
        </div>
        <div
          className='border-black border rounded-2xl p-3 px-4 h-[185px] mt-4 flex justify-center'
          style={{ borderColor: "rgb(0,0,0,0.3)" }}
        >
          <div className='flex justify-center items-center flex-col gap-3'>
            <CircularProgressBar
              radius={50}
              percentage={percentage}
              color={"#D2691E"}
              progressWidth={9}
              bgColor={"#FFD389"}
            />
            <p className='font-medium text-sm'>{`${sheet?.solvedQuestions} out of ${sheet?.totalQuestions} Solved`}</p>
          </div>
        </div>
        <div>
          <ConsistencyTracker currentStreak={currentStreak} consistencyPoints={consistencyPoints} />
        </div>
      </div>
      <div className='w-full mt-8'>
        <TopicsWrapper topics={sheet?.problems} />
      </div>
    </div>
  );
};

export default SheetTopics;