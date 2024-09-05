import React, { useEffect, useState } from 'react';
import { initializeSheet, getSheetData, getData } from './Services/service';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import SheetTopics from './Pages/SheetTopics/SheetTopics';
import ProgressPage from './Pages/ProgressPage/ProgressPage';
import ProblemsSheetPage from './Pages/ProblemsSheetPage/ProblemsSheetPage';
import { Routes, Route } from 'react-router-dom';

//DATA
import lovebabbar from './data/450DSAFinal_updated';
import striver from './data/StriversheetFinal';

function App() {
  const [sheetsData, setSheetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reloadTrigger, setReloadTrigger] = useState(false); // Add reload trigger state

  const fetchSheetsData = async () => {
    try {
      // Fetch data from Localbase
      getData((data) => {
        // Combine all sheets' data into a single array
        const combinedData = data.reduce((acc, sheet) => {
          return acc.concat(sheet.data);
        }, []);
        // Set combined data to state
        setSheetsData(combinedData);
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching sheets data:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSheetsData();
  }, [reloadTrigger]); // Re-fetch data when reloadTrigger changes

  const handleChecklistChange = () => {
    // Function to handle checklist change and trigger data reload
    console.log(reloadTrigger);
    setReloadTrigger((prev) => !prev); // Toggle reloadTrigger to trigger re-fetch
    
  };
  console.log(reloadTrigger);
  return (
    <div className='main' id='DSAsheets'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage sheets={sheetsData} />} />
        <Route path='/sheets/:sheetId/topics' element={<SheetTopics sheets={sheetsData}  reload={reloadTrigger} />} />
        <Route path='/progress' element={<ProgressPage />} />
        <Route path='/sheets/:sheetId/topics/:topicId/problems' element={<ProblemsSheetPage sheets={sheetsData} onChecklistChange={handleChecklistChange}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;