import './App.css';
import Header from './Components/Header/Header';
import Sheetscontainer from './Components/Sheetscontainer/Sheetscontainer';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Topics from './Components/Topics/Topics';
import { useState,useEffect } from 'react';
import { getData, updateDBData, resetDBData, exportDBData, importDBData } from './Services/DBservices';
import TopicQuestions from './Components/TopicQuestions/TopicQuestions';
import Footer from './Components/Footer/Footer';
import About from './Components/About/About'


function App() {

  const [lovebabarsheetData, setLovebabarsheetData] = useState([]);
  const [striversheetData,setstriversheetData] = useState([]);
  const [bro, setBro] = useState(0);


  useEffect(() =>{
    getData((QuestionData) => {
			setLovebabarsheetData(QuestionData);
		},0);
    
    getData((QuestionData2) => {
			setstriversheetData(QuestionData2);
      
		},1);

    

},[]);

function updateData(sheet,key,topicData,topicPosition){
    let circle = [];
    if(sheet === 0)
      circle = lovebabarsheetData;
    else if(sheet === 1)
      circle = striversheetData;

    let reGenerateUpdatedData = circle.map((topic,index) =>{
      if(index === topicPosition) {
        updateDBData(key,topicData,sheet);
        return { topicName: topic.topicName, position: topic.position, ...topicData };
      }
      else{
        return topic;
      }
    });
    if(sheet === 0)
        setLovebabarsheetData(reGenerateUpdatedData);
    else if(sheet === 1)
        setstriversheetData(reGenerateUpdatedData);
}

const topicChange =(e) =>{
    setBro(e);
}

function totalquestions(data)
  {
      let sum = 0;
      data.map((okay) =>{
        sum += okay.questions.length;
      })

      return sum;
  }





  return (
    <div className='main' id='DSAsheets'>
        <Header />
    </div>
  );
}

export default App;
