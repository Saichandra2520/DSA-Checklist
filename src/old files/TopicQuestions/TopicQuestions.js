import React from 'react';
import './topicsquestion.css';
import { useState,useEffect } from 'react';


const TopicQuestions = ({data,updateData,title,s}) => {

    const [questionsTableData, setQuestionsTableData] = useState([]);
    const [topicName, setTopicName] = useState('');
    const [done,setDone] = useState([]);


    useEffect (() => {
        if(data !== undefined)
        {
            let doneQuestion = [];

            let tableData = data.questions.map((question,index) => {
                if (question.Done) {
					doneQuestion.push(index);
				}

                return question;
            })
            setQuestionsTableData(tableData);
            setTopicName(data.topicName);
            setDone(doneQuestion);
        }
       
    },[data]);




    const handleCheckBox = (e,index) => {
        let newDoneQuestion = [...done];
        let key = topicName.replace(/[^A-Z0-9]+/gi, '_').toLowerCase();
        let updatedQuestionsStatus = data.questions.map((question,i ) => {
			if (index === i) {
                console.log(question.Done);
				question.Done = !question.Done;
                console.log(question.Done);
				if (question.Done) {
					newDoneQuestion.push(index);
				} 
                else {
					var pos = newDoneQuestion.indexOf(index);
					newDoneQuestion.splice(pos, 1);
				}
				return question;
			} 
            else 
            {
				return question;
			}
		});
        updateData(s,key,{
            started: newDoneQuestion.length > 0 ? true : false,
            doneQuestions: newDoneQuestion.length,
            questions: updatedQuestionsStatus,
        },data.position)
    };

    const style = {
        width: `${Math.round((done.length/questionsTableData.length)*100)}%`
    }
    
  return (
    <div className='Questions-container'>
        <div className='sheet-title'>
      <h1>{title}</h1>
      <h2>Topic/{topicName}</h2>
      <div className='progressbar-container'>
            <div className='progressbar-done' style={style} >
                <span><b>{Math.round((done.length/questionsTableData.length)*100)}%</b></span>
            </div>     
      </div>
    </div >
    <div className='table-wrapper'>
        <table>
            <tbody>
                <tr id='header-row'>
                    <th width="10%"></th>
                    <th width="5%">ID</th>
                    <th width="70%">Question</th>
                    <th width="7.5%">Link</th>
                    <th width="7.5%">Link</th>
                </tr>
                {
                    questionsTableData.map((question,index) => {
                       return (
                            <tr key={index}>
                                <td><input type='checkbox' id="checkbox" onChange={(e) => handleCheckBox(e,index)}  checked = {question.Done}  ></input></td>
                                <td>{index +1}</td>
                                <td id='tdproblem'>{question.Problem}</td>
                                <td>{question.URL === ''?'':<a href={question.URL} target='_blank'><img src='https://img.icons8.com/color/24/000000/GeeksforGeeks.png' alt='logo'></img></a>}</td>
                                <td>{question.URL2 === '' ?'':<a href={question.URL2} target='_blank'><img src={s===0?'https://i.ibb.co/RcQ5qLs/Coding-Ninjas-logo.jpg':
                                'https://takeuforward.org/wp-content/uploads/2022/08/leetcode-1-150x150.png.webp' } alt='logo'></img></a>}</td>
                            </tr>
                       )
                        
                    })
                }
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default TopicQuestions