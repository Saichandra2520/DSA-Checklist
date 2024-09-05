import React, { useEffect, useState } from 'react';
import { initializeSheet, getSheetData, getData } from './Services/service';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import SheetTopics from './Pages/SheetTopics/SheetTopics';
import ProgressPage from './Pages/ProgressPage/ProgressPage';
import ProblemsSheetPage from './Pages/ProblemsSheetPage/ProblemsSheetPage';
import { Routes, Route } from 'react-router-dom';
import { getHeatmapData, initializeHeatmapData } from "./Services/progress";



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
    setReloadTrigger((prev) => !prev); // Toggle reloadTrigger to trigger re-fetch
    
  };
  //Heat Map and Consistency Tracker Algorithm
  const [currentStreak, setCurrentStreak] = useState(0);
  const [consistencyPoints, setConsistencyPoints] = useState(0);
  const [avgProblems, setAverage] = useState(0);

  const calculateAverageProblemsSolvedThisMonth = (heatmapData) => {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-based index (0 = January)
    
    let totalProblems = 0;
    const monthNames = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"];
  
    // Get the month abbreviation
    const tempmonth = monthNames[currentMonth];
  
    Object.keys(heatmapData).forEach((month) => {
       
      if ( tempmonth == month) { // Adjust for 1-based index in heatmapData
        const days = heatmapData[month];
        
        days.forEach((day, index) => {
          totalProblems += day;
        });
      }
    });
  
  
    return totalProblems; // Handle case with no data
  };

  const calculateActivityMetrics = (data) => {
    let streak = 0;
    let points = 0;
    const average = calculateAverageProblemsSolvedThisMonth(data);
   
    
    Object.keys(data).forEach((month) => {
      const days = data[month];

      days.forEach((day) => {
        if (day > 0) {
          // Day with activity
          streak += 1;
          points = day* (2**streak); // Points increase by powers of 2
        } else {
          // No activity, reset streak
          streak = 1;
        }
      });
    });
    setAverage(average);
    setCurrentStreak(streak);
    setConsistencyPoints(points);
  };

  // Fetch heatmap data from Localbase when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await initializeHeatmapData();
      const data = await getHeatmapData();
      calculateActivityMetrics(data); // Calculate metrics after fetching data
    };
    fetchData();
  }, [reloadTrigger]);

  return (
    <div className='main' id='DSAsheets'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage sheets={sheetsData} currentStreak={currentStreak} consistencyPoints={consistencyPoints} />} />
        <Route path='/sheets/:sheetId/topics' element={<SheetTopics sheets={sheetsData}  reload={reloadTrigger} currentStreak={currentStreak} consistencyPoints={consistencyPoints} />} />
        <Route path='/progress' element={<ProgressPage sheets={sheetsData} currentStreak={currentStreak} consistencyPoints={consistencyPoints} avgProblems={avgProblems} />} />
        <Route path='/sheets/:sheetId/topics/:topicId/problems' element={<ProblemsSheetPage sheets={sheetsData} onChecklistChange={handleChecklistChange} currentStreak={currentStreak} consistencyPoints={consistencyPoints} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;