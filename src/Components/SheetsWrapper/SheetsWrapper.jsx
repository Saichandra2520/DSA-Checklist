import React from 'react'
import SheetsCard from '../SheetsCard/SheetsCard'

const SheetsWrapper = ({navigateto, sheets}) => {
  return (
    <div className='' style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(331px, 1fr))",gap:"2rem"  }} >
        { sheets?.map((sheet => 
            <SheetsCard sheet={sheet} />
        ))}
    </div>
  )
}

export default SheetsWrapper