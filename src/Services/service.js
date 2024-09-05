import Localbase from "localbase";
import sheet2Data, { version } from "../data/StriversheetFinal";
import sheet1Data from "../data/450DSAFinal_updated";


// Initialize the database
let db = new Localbase("db");
window.db = db; // Exposing db globally for easy access
db.config.debug = false; // Disable debugging

// Retrieve the current version stored in localStorage
const localVersion = localStorage.getItem("DSversion");
window.localVersion = localVersion; // Exposing localVersion globally
window.version = version; // Exposing current version globally

// Object to hold all sheets' data
let sheets = {
    "striversheet": sheet2Data,
};

// Function to insert data for all sheets into the database
export function insertData(callback) {
    Object.keys(sheets).forEach(sheetName => {
        const sheetData = sheets[sheetName];
        db.collection(sheetName).add(sheetData, sheetData.id);
    });
    getData(callback); // Retrieve data after insertion
}

// Function to retrieve data for all sheets from the database
export function getData(callback) {
    let allData = []; // Array to store data from all sheets
    let sheetsProcessed = 0; // Counter to track processed sheets

    Object.keys(sheets).forEach(sheetName => {
        db.collection(sheetName)
            .get()
            .then((data) => {
                if (data.length === 0) {
                    insertData(callback); // Insert data if collection is empty
                } else {
                    allData.push({ sheetName, data }); // Add data to allData array
                }

                sheetsProcessed++;
                if (sheetsProcessed === Object.keys(sheets).length) {
                    if (localVersion === null || localVersion === undefined) {
                        // Set initial version if not set
                        localStorage.setItem("DSversion", 100000000);
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else if (parseInt(localVersion) !== version) {
                        // Update data if version has changed
                        allData.forEach(sheet => {
                            const sheetData = sheets[sheet.sheetName];
                            const key = sheetData.id;

                            sheet.data.forEach((storedSheet) => {
                                if (storedSheet.id === key) {
                                    sheetData.problems.forEach((problem, index) => {
                                        if (storedSheet.problems[index].Done) {
                                            problem.Done = true;
                                        }
                                        if (storedSheet.problems[index].Bookmark) {
                                            problem.Bookmark = storedSheet.problems[index].Bookmark;
                                        }
                                        if (storedSheet.problems[index].Notes) {
                                            problem.Notes = storedSheet.problems[index].Notes;
                                        }
                                    });
                                    
                                    updateDBData(sheet.sheetName, key, {
                                        ...storedSheet,
                                        solvedQuestions: sheetData.solvedQuestions,
                                        problems: sheetData.problems,
                                    });
                                }
                            });
                        });
                        localStorage.setItem("DSversion", version);
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else {
                        return callback(allData); // Pass retrieved data to the callback
                    }
                }
            });
    });
}

// Function to retrieve data for a specific topic in a specific sheet
export function getTopicData(sheetName, key, callback) {
    db.collection(sheetName)
        .doc(key)
        .get()
        .then((document) => {
            callback(document); // Pass the retrieved document to the callback
        });
}

// Function to update data for a specific topic in a specific sheet
export function updateDBData(sheetName, key, updateData) {
    db.collection(sheetName).doc(sheetName).update(updateData);
}

// Function to reset all data in the database for all sheets
export function resetDBData(callback) {
    let promises = Object.keys(sheets).map(sheetName =>
        db.collection(sheetName).delete()
    );

    Promise.all(promises)
        .then(response => callback(response)) // Pass response to the callback
        .catch(error => console.log("There was an error, do something else", error));
}

// Function to export all data from the database for all sheets
export function exportDBData(callback) {
    let allData = [];
    let sheetsProcessed = 0;

    Object.keys(sheets).forEach(sheetName => {
        db.collection(sheetName)
            .get()
            .then((data) => {
                allData.push({ sheetName, data });

                sheetsProcessed++;
                if (sheetsProcessed === Object.keys(sheets).length) {
                    callback(allData); // Pass all data to the callback
                }
            });
    });
}

// Function to import data into the database for all sheets
export function importDBData(data, callback) {
    resetDBData((response) => {
        new Promise((resolve, reject) => {
            data.forEach((sheet, sheetIndex) => {
                db.collection(sheet.sheetName).add(sheet, sheet.id);
                if (sheetIndex === data.length - 1) {
                    resolve();
                }
            });
        }).then(() => {
            getData((data) => {
                callback(data); // Pass the retrieved data to the callback
            });
        });
    });
}