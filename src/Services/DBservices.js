import Localbase from "localbase";
import QuestionData1 from "../450DSAFinal";
import QuestionData2, { version } from "../StriversheetFinal";


let db = new Localbase("database");
window.db = db;
db.config.debug = false;
const localVersion = localStorage.getItem("450version");
window.localVersion = localVersion;
window.version = version;
const sheets =["450dsaArchive","striverdsaArchive"];

export function insertData(callback,sheet) {
	let QuestionData =[];
	if(sheet === 0)
		QuestionData = QuestionData1;
	else if(sheet === 1)
		QuestionData = QuestionData2;


	QuestionData.forEach((topic, index) => {
		db.collection(sheets[sheet]).add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
	});
	getData(callback,sheet);
}

export function getData (callback,sheet) {
	db.collection(sheets[sheet])
		.get()
		.then((data) => {
			if(data.length === 0){
				insertData(callback,sheet);
			}

			else {
				data.sort((a,b) =>{
					return a.position-b.position;
				});

				if (localVersion === null || localVersion === undefined) {
					localStorage.setItem("450version", 100000000);
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				}

				if (parseInt(localVersion) !== version) {
					let i = 0;
					let QuestionData =[];
					if(sheet === 0)
						QuestionData = QuestionData1;
					else if(sheet === 1)
						QuestionData = QuestionData2;


					for (let topic of data) {
						let dataFromJSON = QuestionData[i].questions;
						let len = dataFromJSON.length;
						let key = topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
						topic.questions.forEach((qObj, index) => {
							console.log(topic);
							if (index < len) {
								if (qObj.Done) {
									dataFromJSON[index]["Done"] = true;
								}
								if (qObj.hasOwnProperty("Bookmark")) {
									dataFromJSON[index]["Bookmark"] = qObj.Bookmark;
								} 
								else 
								{
									dataFromJSON[index]["Bookmark"] = false;
								}
								if (qObj.hasOwnProperty("Notes")) 
								{
									dataFromJSON[index]["Notes"] = qObj.Notes;
								} else {
									dataFromJSON[index]["Notes"] = "";
								}
							}
						});
						updateDBData(key, {
							started: topic.started,
							doneQuestions: topic.doneQuestions,
							questions: dataFromJSON,
						});
						i++;
					}
					localStorage.setItem("450version", version);
					setTimeout(() => {
						// window.location.reload();
					}, 3000);
				}
				else {
					return callback(data);
				}
			}
		})


}

export function getTopicData(key, callback,sheet) {
	db.collection(sheets[sheet])
		.doc(key)
		.get()
		.then((document) => {
			callback(document);
		});
}

export function updateDBData(key, updateData,sheet) {
	db.collection(sheets[sheet]).doc(key).update(updateData);
}

export function resetDBData(callback,sheet) {
	db.collection(sheets[sheet])
		.delete()
		.then((response) => {
			callback(response);
		})
		.catch((error) => {
			console.log("There was an error, do something else", error);
		});
}

export function exportDBData(callback,sheet) {
	db.collection(sheets[sheet])
		.get()
		.then((data) => {
			callback(data);
		});
}

export function importDBData(data, callback,sheet) {
	resetDBData((response) => {
		new Promise((resolve, reject) => {
			data.forEach((topic, index) => {
				db.collection(sheets[sheet]).add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
				if (index === data.length - 1) {
					resolve();
				}
			});
		}).then(() => {
			getData((data) => {
				callback(data);
			});
		});
	});
}
