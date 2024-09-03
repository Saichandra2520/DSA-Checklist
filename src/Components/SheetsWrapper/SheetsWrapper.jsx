import React from 'react'
import SheetsCard from '../SheetsCard/SheetsCard'

const SheetsWrapper = ({navigateto}) => {
  return (
    <div className='' style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(331px, 1fr))",gap:"2rem"  }} >
        <SheetsCard navigateto={navigateto}/>
        <SheetsCard navigateto />
        <SheetsCard />
        <SheetsCard />
        <SheetsCard />
        <SheetsCard />
        <SheetsCard />
        <SheetsCard />
    </div>
  )
}

export default SheetsWrapper