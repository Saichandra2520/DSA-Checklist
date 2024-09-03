import React from 'react'
import CircularProgressBar from '../../Components/Tools/CircularProgressBar/CircularProgressBar'
import ConsistencyTracker from '../../Components/ConsistencyTracker/ConsistencyTracker'
import SheetsWrapper from '../../Components/SheetsWrapper/SheetsWrapper'

const SheetTopics = () => {
  return (
    <div className='flex justify-center items-center w-[75vw] flex-wrap m-auto' >
        <div className='flex gap-3 flex-wrap w-full m-auto justify-center' >
            <div className='flex flex-col  justify-center items-center'>
                <h2 className='font-bold text-xl' >Love Babbar DSA Sheet</h2>
                <p>Author: Love Babbar</p>
            </div>
            <div className='border-black border rounded-2xl p-3 px-4 h-[185px] mt-4 flex justify-center ' style={{borderColor: "rgb(0,0,0,0.3)"}}>
                <div className='flex justify-center items-center flex-col gap-3'>
                    <CircularProgressBar radius={50} percentage={25} color={"#D2691E"} progressWidth={9} bgColor={"#FFD389"}  />
                    <p className='font-medium text-sm' >36 out of 448 Completed</p>
                </div>
            </div>
            <div className=''>
                <ConsistencyTracker />
            </div>
        </div>
        <div className='w-full mt-8' >
            <SheetsWrapper navigateto='problems' />
        </div>
    </div>
  )
}

export default SheetTopics