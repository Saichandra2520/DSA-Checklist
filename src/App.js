import React, { useEffect, useState } from 'react';
import { initializeSheet, getSheetData, getData } from './Services/service'; // Import functions for initializing and fetching sheet data
import Header from './Components/Header/Header'; // Import Header component
import Footer from './Components/Footer/Footer'; // Import Footer component
import HomePage from './Pages/HomePage/HomePage'; // Import HomePage component
import SheetTopics from './Pages/SheetTopics/SheetTopics'; // Import SheetTopics component
import ProgressPage from './Pages/ProgressPage/ProgressPage'; // Import ProgressPage component
import ProblemsSheetPage from './Pages/ProblemsSheetPage/ProblemsSheetPage'; // Import ProblemsSheetPage component
import { Routes, Route } from 'react-router-dom'; // Import routing components from react-router-dom
import { getHeatmapData, initializeHeatmapData } from "./Services/progress"; // Import functions for heatmap data management

function App() {
  // State to hold the sheets data
  const [sheetsData, setSheetsData] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // State to trigger reload of data
  const [reloadTrigger, setReloadTrigger] = useState(false); 

  // Function to fetch sheets data from Localbase
  const fetchSheetsData = async () => {
    try {
      // Fetch data using getData function
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
      // Handle any errors during fetching
      console.error('Error fetching sheets data:', error);
      setError(error);
      setLoading(false);
    }
  };

  // Fetch sheets data when component mounts or reloadTrigger changes
  useEffect(() => {
    fetchSheetsData();
  }, [reloadTrigger]);

  // Function to handle changes in checklist and trigger data reload
  const handleChecklistChange = () => {
    // Toggle reloadTrigger to re-fetch data
    setReloadTrigger((prev) => !prev); 
  };

  // State to track the current streak of activity
  const [currentStreak, setCurrentStreak] = useState(0);
  // State to track the consistency points based on streak
  const [consistencyPoints, setConsistencyPoints] = useState(0);
  // State to track the average number of problems solved this month
  const [avgProblems, setAverage] = useState(0);

  // Function to calculate the average number of problems solved in the current month
  const calculateAverageProblemsSolvedThisMonth = (heatmapData) => {
    const today = new Date();
    const currentMonth = today.getMonth(); // Get the current month (0-based index)
    
    let totalProblems = 0;
    const monthNames = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"];
  
    // Get the current month abbreviation
    const tempmonth = monthNames[currentMonth];
  
    // Loop through the heatmap data for the current month
    Object.keys(heatmapData).forEach((month) => {
      if (tempmonth === month) {
        const days = heatmapData[month];
        // Sum up the problems solved each day
        days.forEach((day) => {
          totalProblems += day;
        });
      }
    });
  
    // Return the total problems solved in the current month
    return totalProblems;
  };

  // Function to calculate activity metrics such as streak and consistency points
  const calculateActivityMetrics = (data) => {
    let streak = 0;
    let points = 0;
    const average = calculateAverageProblemsSolvedThisMonth(data);
   
    // Loop through the heatmap data to calculate streak and points
    Object.keys(data).forEach((month) => {
      const days = data[month];
      days.forEach((day) => {
        if (day > 0) {
          // Day with activity increases streak and points
          streak += 1;
          points = day * (2 ** streak); // Points increase exponentially with streak
        } else {
          // No activity, reset streak
          streak = 1;
        }
      });
    });
    
    // Update state with calculated metrics
    setAverage(average);
    setCurrentStreak(streak);
    setConsistencyPoints(points);
  };

  // Fetch heatmap data from Localbase and calculate metrics when component mounts or reloadTrigger changes
  useEffect(() => {
    const fetchData = async () => {
      await initializeHeatmapData(); // Initialize heatmap data if needed
      const data = await getHeatmapData(); // Fetch heatmap data
      calculateActivityMetrics(data); // Calculate metrics after fetching data
    };
    fetchData();
  }, [reloadTrigger]);

  return (
    <div className='main' id='DSAsheets'>
      <Header /> {/* Render the Header component */}
      <Routes>
        {/* Define routes for different pages */}
        <Route path='/' element={<HomePage sheets={sheetsData} currentStreak={currentStreak} consistencyPoints={consistencyPoints} />} />
        <Route path='/sheets/:sheetId/topics' element={<SheetTopics sheets={sheetsData} reload={reloadTrigger} currentStreak={currentStreak} consistencyPoints={consistencyPoints} />} />
        <Route path='/progress' element={<ProgressPage sheets={sheetsData} currentStreak={currentStreak} consistencyPoints={consistencyPoints} avgProblems={avgProblems} />} />
        <Route path='/sheets/:sheetId/topics/:topicId/problems' element={<ProblemsSheetPage sheets={sheetsData} onChecklistChange={handleChecklistChange} currentStreak={currentStreak} consistencyPoints={consistencyPoints} />} />
      </Routes>
      <Footer /> {/* Render the Footer component */}
    </div>
  );
}

export default App;