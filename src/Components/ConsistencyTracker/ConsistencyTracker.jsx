import React from 'react';
import fireIcon from '../../assets/Fire.svg';
import coinIcon from '../../assets/Coin.svg'

const ConsistencyTracker = ({currentStreak, consistencyPoints}) => {

    
  return (
    <div className='mt-4 box-border w-full h-[185px] p-3 px-4 border border-black rounded-2xl flex flex-col' style={{borderColor: "rgb(0,0,0,0.1)"}} >
        <h3 className='font-semibold text-base ' >Consistency Tracker</h3>
        <p className='font-normal text-xs text-slate-600 mt-1' >Track your learning progress and consistency</p>
        <div className='w-full flex mt-3 items-center' >
            <div className='w-1/2 flex justify-center border-r-2 flex-col' >
                <h5 className='font-semibold text-[12px] self-center'>Current Streak</h5>
                <div className='flex mt-3 mx-auto gap-2'>
                    <img className='' src={fireIcon} width={30} />
                    <p className='text-4xl font-semibold' >{currentStreak}</p>
                </div>
                
            </div>
            <div className='w-1/2 flex justify-center flex-col' >
                <h5 className='font-semibold text-[12px] self-center'>Consistency Points</h5>
                <div className='flex mt-3 mx-auto gap-2'>
                    <img className='' src={coinIcon} width={40} />
                    <p className='text-4xl font-semibold' >{consistencyPoints}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConsistencyTracker