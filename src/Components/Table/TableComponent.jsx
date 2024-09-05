import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import './styles.css'; // Ensure your CSS file is imported
import { getTopicData, updateDBData } from '../../Services/service'; // Adjust the import path
import { useParams } from 'react-router-dom';
import { updateHeatmapData } from '../../Services/progress';

const TableComponent = ({ onChecklistChange, onHeatmapChange }) => {
  const [sortOrder, setSortOrder] = useState('easy');
  const [celebrate, setCelebrate] = useState(false);
  const { topicId, sheetId } = useParams();
  const [sheet, setSheet] = useState();
  const [topic, setTopic] = useState();
  const [problemData, setProblemData] = useState();
  const [heatmapData, setHeatmapData] = useState({}); // New heatmap state

  // Utility function to get the current date as a string
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  // Initialize heatmap state
  useEffect(() => {
    const today = getCurrentDate();
    setHeatmapData((prevData) => ({
      ...prevData,
      [today]: prevData[today] || 0, // Initialize today's count if not present
    }));
  }, []);

  const topicfilter = (topic) => {
    return topicId === topic.topicName.toLowerCase().split(' ').join('');
  };

  useEffect(() => {
    getTopicData('striversheet', 'striversheet', (data) => {
      setSheet(data);
      setTopic(data?.problems?.filter(topicfilter)[0]);
      setProblemData(data?.problems?.filter(topicfilter)[0].questions);
    });
  }, []);

  const getSortedProblems = () => {
    const difficultyOrder = {
      easy: ['easy', 'medium', 'hard'],
      medium: ['medium', 'easy', 'hard'],
      hard: ['hard', 'easy', 'medium'],
    };

    return [...problemData]?.sort((a, b) => {
      const order = difficultyOrder[sortOrder];
      return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
    });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const countDoneQuestions = (problems) => {
    return problems.reduce((count, problem) => (problem.Done ? count + 1 : count), 0);
  };

  const countDoneQuestionsSheet = (problems) => {
    return problems.reduce((count, problem) => problem.doneQuestions + count, 0);
  };

  const handleCheckboxChange = (problem) => {
    const today = getCurrentDate();

    let updatedQuestionsStatus = topic.questions.map((question) => {
      if (question.URL === problem.URL) {
        question.Done = !question.Done;
        return question;
      } else {
        return question;
      }
    });

    let updatedProblems = sheet.problems.map((topic) => {
      if (topic.topicName === updatedQuestionsStatus[0].Topic) {
        const doneCount = countDoneQuestions(topic.questions);
        topic.doneQuestions = doneCount;
        topic.questions = updatedQuestionsStatus;
        return topic;
      } else {
        return topic;
      }
    });

    const questionsSolvedSheet = countDoneQuestionsSheet(sheet.problems);

    let updatedSheet = { ...sheet, solvedQuestions: questionsSolvedSheet, problems: updatedProblems };

    // Update the problem status in Localbase
    updateDBData(sheetId, sheetId, updatedSheet);
    setProblemData(updatedQuestionsStatus);
    
    // Update the heatmap based on the checkbox status
    setHeatmapData((prevHeatmapData) => {
      const newHeatmapData = { ...prevHeatmapData };
      if (problem.Done) {
        newHeatmapData[today] = (newHeatmapData[today] || 0) + 1; // Increment if Done
      } else {
        newHeatmapData[today] = Math.max((newHeatmapData[today] || 1) - 1, 0); // Decrement if not Done
      }
      updateHeatmapData(today , newHeatmapData[today]);
      return newHeatmapData;
    });

    // Trigger celebration animation and confetti on completion
    if (problem.Done) {
      setCelebrate(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9A8B', '#FF6F61', '#D83A56'],
      });
      setTimeout(() => setCelebrate(false), 1000); // Hide animation after 1s
    }
  };

  if (!problemData) {
    return <div>Loading...</div>; // Or null, or any placeholder
  } else {
    return (
      <div className="flex flex-col">
        {celebrate && <div className="celebrate-animation"></div>}
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div
              className="overflow-hidden shadow-md sm:rounded-lg border-black border rounded-2xl"
              style={{ borderColor: 'rgb(0,0,0,0.1)' }}
            >
              <div className="flex justify-between items-center px-6 py-4 bg-[#ffd287a3]">
                <span className="text-lg font-medium text-gray-900">Problems</span>
                <div className="flex items-center">
                  <label
                    htmlFor="difficulty"
                    className="mr-2 text-xs font-normal text-gray-700"
                  >
                    Sort by Difficulty:
                  </label>
                  <select
                    id="difficulty"
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="block w-full px-3 py-2 border border-black-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    style={{ borderColor: 'rgb(0,0,0,0.1)' }}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <table className="min-w-full border-none">
                <thead className="">
                  <tr>
                    <th className="px-2 py-4 text-left">
                      <p className="text-sm font-normal text-center">Checkbox</p>
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    ></th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Problem Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Difficulty
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Solve
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="border-black border-t-2"
                  style={{ borderColor: 'rgb(0,0,0,0.1)' }}
                >
                  {getSortedProblems()?.map((problem, index) => (
                    <tr
                      key={index}
                      className={`bg-white border-b hover:bg-gray-50 ${
                        problem?.Done ? 'bg-green-100' : ''
                      }`}
                    >
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-center border-none">
                        <input
                          type="checkbox"
                          checked={problem?.Done}
                          onChange={() => handleCheckboxChange(problem)}
                          className="custom-checkbox"
                        />
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm border-none font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap border-none">
                        <a href={problem?.URL} target="_blank">
                          {problem?.Problem}
                        </a>
                      </td>
                      <td
                        className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none"
                        style={{
                          color:
                            problem?.difficulty === 'easy'
                              ? '#1CBABA'
                              : problem?.difficulty === 'medium'
                              ? '#FF9800'
                              : '#F44336',
                        }}
                      >
                        {problem?.difficulty[0]?.toUpperCase() +
                          problem?.difficulty?.slice(1)}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-none">
                        <a href={problem?.URL} target="_blank">
                          Link
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TableComponent;