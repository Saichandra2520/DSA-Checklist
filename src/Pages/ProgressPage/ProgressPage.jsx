import React from 'react'
import ConsistencyTracker from '../../Components/ConsistencyTracker/ConsistencyTracker';
import BulbIcon from '../../assets/Bulb.svg';
import Heatmap from '../../Components/HeatMap/HeatMap';
import SpeedometerProgress from '../../Components/SpeedoProgress/SpeedoProgress';
import TopicwiseAnalytics from '../../Components/TopicWiseAnalytics/TopicwiseAnalytics';

const ProgressPage = () => {
  return (
    <div className='max-w-5xl m-auto' >
        <div className='flex gap-4 justify-between' >
            <div>
            <ConsistencyTracker />
            </div>
            <div className='flex flex-col justify-around items-center mt-4 box-border h-[185px] pb-8  px-4 border border-black rounded-2xl' style={{borderColor: "rgb(0,0,0,0.1)"}}  >
                <h5 className='mt-3 font-semibold text-center' >
                    Average Problems Solved <br />
                    (Last 7 Days)
                </h5>
                <div className='mt-4 flex justify-center items-center'>
                    <img src={BulbIcon}  />
                    <p className='font-bold text-4xl' > 10 </p>
                </div>
            </div>
            <div className='flex justify-around items-center mt-4 box-border h-[185px] p-8  px-4 border border-black rounded-2xl' style={{borderColor: "rgb(0,0,0,0.1)"}} >
                <div className='lc-xl:h-[180px] min-h-[180px] w-full p-4'>
                    <SpeedometerProgress easy={200} medium={240} hard={300} totalSolved={25} totalQuestions={500} radius={50} percentage={25} color={"#2496EF"} progressWidth={12} />
                </div>
            </div>
        </div>
        <div>
            <Heatmap />
        </div>
        <div className='mt-6'>
            <TopicwiseAnalytics />
        </div>
    </div>
  )
}

export default ProgressPage