import React from 'react';
import './circularprogressbar.css';

const CircularProgressBar = ({percentage,circleWidth}) => {

    const radius = 42;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    const st = {
        strokeDasharray: `${dashArray}`,
        strokeDashoffset: `${dashOffset}`,
    }
    
  return (
    <div className='cpbar'>
        <svg
            width={circleWidth}
            height={circleWidth}
            viewBox={`0 0 ${circleWidth} ${circleWidth}`}
            >
                <defs>
                    <linearGradient id='gradiant'>
                        <stop offset="10%" stop-color="#12c2e9"/>
                        <stop offset="50%" stop-color="#c471ed"/>
                        <stop offset="100%" stop-color="#f64f59"/>
                    </linearGradient>
                </defs>

            <circle
                cx={circleWidth/2}
                cy={circleWidth/2}
                strokeWidth="10px"
                r ={radius}
                className="circle-background"
                />

            <circle
                cx={circleWidth/2}
                cy={circleWidth/2}
                strokeWidth="10px"
                r ={radius}
                className="circle-progress"
                style={st}
                

                transform= {`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                stroke="url(#gradiant)"
                />
                <text x="50%" y="50%" dy='0.3em' textAnchor='middle' className='circle-text'>
                    {Math.round(percentage)}%
                </text>
        </svg>
    </div>
  )
}

export default CircularProgressBar