import Localbase from 'localbase';

let db = new Localbase('heatmapDB');
db.config.debug = false; // Disable debugging

// Helper function to get the number of days in a month
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate(); // month is 0-indexed, so month+1
};

// Dynamically initialize heatmap data based on the current year
export const initializeHeatmapData = async () => {
  const currentYear = new Date().getFullYear();
  let dataExists = await db.collection('heatmap').doc(`year${currentYear}`).get();

  if (!dataExists) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let heatmapData = {};

    months.forEach((month, monthIndex) => {
      const daysInMonth = getDaysInMonth(monthIndex, currentYear);
      heatmapData[month] = Array(daysInMonth).fill(0); // Initialize with 0 (no activity)
    });

    await db.collection('heatmap').doc(`year${currentYear}`).set({
      data: heatmapData
    });
  }
};

// Fetch the heatmap data for the current year from Localbase
export const getHeatmapData = async () => {
  const currentYear = new Date().getFullYear();
  const doc = await db.collection('heatmap').doc(`year${currentYear}`).get();
  return doc?.data || {};
};

// Function to get the month abbreviation and day from a date string
const getMonthAndDay = (dateString) => {
    // Create a Date object from the date string
    const date = new Date(dateString);
  
    // Extract the month and day
    const day = date.getDate();
    const monthIndex = date.getMonth();
  
    // Array of month abbreviations
    const monthNames = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"];
  
    // Get the month abbreviation
    const month = monthNames[monthIndex];
  
    return { month, day };
  };

// Update the heatmap data when user interacts with checklist
export const updateHeatmapData = async ( today, newValue) => {

    const { month, day } = getMonthAndDay(today);
  const currentYear = new Date().getFullYear();
  let doc = await db.collection('heatmap').doc(`year${currentYear}`).get();
  let heatmapData = doc.data;
  // Update the specific day in the month
  if(newValue)
      heatmapData[month][day-1] = heatmapData[month][day-1] + 1;
  else{
    heatmapData[month][day-1] = heatmapData[month][day-1] -1 < 0 ? 0 :  heatmapData[month][day-1] -1;
  }

  // Save the updated data back to Localbase
  await db.collection('heatmap').doc(`year${currentYear}`).set({ data: heatmapData });
};