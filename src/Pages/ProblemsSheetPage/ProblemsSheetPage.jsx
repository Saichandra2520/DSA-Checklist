import React, { useEffect, useState } from 'react'
import ConsistencyTracker from '../../Components/ConsistencyTracker/ConsistencyTracker';
import CircularProgressBar from '../../Components/Tools/CircularProgressBar/CircularProgressBar';
import TableComponent from '../../Components/Table/TableComponent';
import { useParams } from 'react-router-dom';
import { getTopicData } from '../../Services/service';

const ProblemsSheetPage = ({ onChecklistChange, currentStreak, consistencyPoints }) => {

    // Extracts topicId and sheetId from the URL parameters using useParams
    const { topicId, sheetId } = useParams();
    const [sheet, setSheet] = useState();

    // Filters the topics based on the topicId from the URL, normalizing the topic name
    function topicfilter(topic) {
        return topicId === topic.topicName.toLowerCase().split(" ").join("");
    }

    // Fetches the topic data when the component is mounted or onChecklistChange is triggered
    useEffect(() => {
        getTopicData(sheetId, sheetId, (data) => {
            setSheet(data);
        })
    }, [onChecklistChange]);

    // Extracts the topic based on the filtered topic name
    const topic = sheet?.problems?.filter(topicfilter)[0];

    // Calculates the percentage of solved questions for the topic
    let percentage = topic?.doneQuestions ? Math.floor((topic?.doneQuestions / topic?.questions.length) * 100) : 0;

    // Updates the percentage when the sheet data changes
    useEffect(() => {
        percentage = topic?.doneQuestions ? Math.floor((topic?.doneQuestions / topic?.questions.length) * 100) : 0;
    }, [sheet]);

    return (
        <div className='flex justify-center items-center w-[75vw] flex-wrap mx-auto mb-9' >
            <div className='flex gap-3 flex-wrap w-full m-auto justify-around' >
                
                {/* Display the sheet name and topic name */}
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-bold text-xl'>{sheet?.sheetName}</h2>
                    <p>{topic?.topicName}</p>
                </div>
                
                {/* Circular progress bar to show the percentage of solved questions */}
                <div className='border-black border rounded-2xl p-3 px-4 h-[185px] mt-4 flex justify-center ' style={{ borderColor: "rgb(0,0,0,0.1)" }}>
                    <div className='flex justify-center items-center flex-col gap-3'>
                        <CircularProgressBar radius={50} percentage={percentage} color={"#D2691E"} progressWidth={9} bgColor={"#FFD389"} />
                        <p className='font-medium text-sm'>{`${topic?.doneQuestions} out of ${topic?.questions.length} Solved`}</p>
                    </div>
                </div>

                {/* Consistency tracker for displaying current streak and consistency points */}
                <div className=''>
                    <ConsistencyTracker currentStreak={currentStreak} consistencyPoints={consistencyPoints} />
                </div>
            </div>

            {/* Table component for displaying the list of problems */}
            <div className='w-full mt-8' >
                <TableComponent problems={topic?.questions} sheet={sheet} topic={topic} onChecklistChange={onChecklistChange} />
            </div>
        </div>
    )
}

export default ProblemsSheetPage;