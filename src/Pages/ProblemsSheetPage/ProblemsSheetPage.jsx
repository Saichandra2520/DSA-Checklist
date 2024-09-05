import React, { useEffect, useState } from 'react'
import ConsistencyTracker from '../../Components/ConsistencyTracker/ConsistencyTracker';
import CircularProgressBar from '../../Components/Tools/CircularProgressBar/CircularProgressBar';
import TableComponent from '../../Components/Table/TableComponent';
import { useParams } from 'react-router-dom';
import { getTopicData } from '../../Services/service';

const ProblemsSheetPage = ( {onChecklistChange} ) => {

    const {topicId, sheetId} = useParams();
    const [sheet,setSheet] = useState();
    function sheetfilter(sheet){
        return sheet.id === sheetId
    }
    function topicfilter(topic){
        return topicId === topic.topicName.toLowerCase().split(" ").join("");
    }
    useEffect(()=>{
        getTopicData(sheetId, sheetId, (data)=>{
          setSheet(data);
      })
      },[onChecklistChange]);
    
    const topic = sheet?.problems?.filter(topicfilter)[0];

    //Percentage Calculation
   let percentage = topic?.doneQuestions ? Math.floor((topic?.doneQuestions / topic?.questions.length) * 100) : 0;

   console.log(sheet);
   useEffect(()=>{
    percentage = topic?.doneQuestions ? Math.floor((topic?.doneQuestions / topic?.questions.length) * 100) : 0;
   },[sheet]);
    
  return (
    <div className='flex justify-center items-center w-[75vw] flex-wrap mx-auto mb-9' >
        <div className='flex gap-3 flex-wrap w-full m-auto justify-around' >
            <div className='flex flex-col  justify-center items-center'>
                <h2 className='font-bold text-xl' >{sheet?.sheetName}</h2>
                <p>{topic?.topicName}</p>
            </div>
            <div className='border-black border rounded-2xl p-3 px-4 h-[185px] mt-4 flex justify-center ' style={{borderColor: "rgb(0,0,0,0.1)"}}>
                <div className='flex justify-center items-center flex-col gap-3'>
                    <CircularProgressBar radius={50} percentage={percentage} color={"#D2691E"} progressWidth={9} bgColor={"#FFD389"}  />
                    <p className='font-medium text-sm' >{`${topic?.doneQuestions} out of ${topic?.questions.length} Solved`}</p>
                </div>
            </div>
            <div className=''>
                <ConsistencyTracker />
            </div>
        </div>
        <div className='w-full mt-8' >
            <TableComponent problems ={topic?.questions} sheet={sheet} topic={topic} onChecklistChange={onChecklistChange}/>
        </div>
    </div>
  )
}

export default ProblemsSheetPage