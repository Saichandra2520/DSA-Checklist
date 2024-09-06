import React from 'react'
import TopicsCard from '../TopicsCard/TopicsCard';

const TopicsWrapper = ({topics}) => {
  return (
    <div className='' style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(331px, 1fr))",gap:"2rem"  }} >
          {topics?.map((topic)=>
            <TopicsCard key={topic?.position} topic={topic} />
        )}
    </div>
  )
}

export default TopicsWrapper;