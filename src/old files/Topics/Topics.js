import React from 'react';
import './topics.css';
import { useNavigate } from 'react-router-dom';
import CircularProgressBar from '../../Components/Tools/CircularProgressBar/CircularProgressBar';


const Topics = ({topics,topicChange,title}) => {
  const navigate1 = useNavigate();

  const handleTopicClick = (e) => {
      
      topicChange(e)
      navigate1('problems');

  }

  return (
    <>
    <div className='sheet-title'>
      <h1>{title}</h1>
    </div>
    
    <div className='topics-container'>
      
    {
        topics.map((topic) =>{
          return (
              <div className='topic-item' >
                <div className="topic-item-primary">
                  <h2>{topic.topicName}</h2>
                  <h4>Total Questions: {topic.questions.length}</h4>
                  <h5
                    style={{color: topic.started ? 'green':'gray' }}>{topic.started === true  ? topic.doneQuestions===topic.questions.length?`Hurray🎉` :`${topic.questions.length - topic.doneQuestions} more to go👇`:'Not Yet Started'}</h5>
                  <button onClick={() => handleTopicClick(topic.position)}>{topic.started === true  ? topic.doneQuestions===topic.questions.length?'Completed':'Continue':'Start Now'}</button>
                </div>
                <div className='progress-hover'>
                  <CircularProgressBar percentage={(topic.doneQuestions/topic.questions.length)*100} circleWidth="100" />
                </div>
              </div>
          )
          
        })
    }
    </div>
    </>
  )
}

export default Topics

