import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import './styles.css'; // Ensure your CSS file is imported
import { getTopicData, updateDBData } from '../../Services/service'; // Adjust the import path
import { useParams } from 'react-router-dom';
import { getHeatmapData, initializeHeatmapData, updateHeatmapData } from '../../Services/progress';

const TableComponent = ({ onChecklistChange }) => {
  // State to manage sorting order and celebration animation
  const [sortOrder, setSortOrder] = useState('easy');
  const [celebrate, setCelebrate] = useState(false);

  // Extract topicId and sheetId from URL parameters
  const { topicId, sheetId } = useParams();

  // State to store sheet, topic, problem data, and heatmap data
  const [sheet, setSheet] = useState();
  const [topic, setTopic] = useState();
  const [problemData, setProblemData] = useState();
  const [heatmapData, setHeatmapData] = useState(); // New heatmap state

  // Utility function to get the current date as a string in YYYY-MM-DD format
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  // Filter function to match the topic based on topicId
  const topicfilter = (topic) => {
    return topicId === topic.topicName.toLowerCase().split(' ').join('');
  };

  // Fetch topic data and initialize the component's state on mount
  useEffect(() => {
    getTopicData(sheetId, sheetId, (data) => {
      setSheet(data);
      setTopic(data?.problems?.filter(topicfilter)[0]);
      setProblemData(data?.problems?.filter(topicfilter)[0].questions);
    });
  }, [sheetId, topicId]);

  // Fetch heatmap data from Localbase when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await initializeHeatmapData();
      const data = await getHeatmapData();
      setHeatmapData(data);
    };
    fetchData();
  }, []);

  // Sort problems based on difficulty order
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

  // Handle changes in sorting order
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Count the number of done questions in the problems array
  const countDoneQuestions = (problems) => {
    return problems.reduce((count, problem) => (problem.Done ? count + 1 : count), 0);
  };

  // Count the total number of done questions in the sheet
  const countDoneQuestionsSheet = (problems) => {
    return problems.reduce((count, problem) => problem.doneQuestions + count, 0);
  };

  // Handle checkbox change for problem status
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
        updateHeatmapData(today, true);
      } else {
        updateHeatmapData(today, false);
      }
      
      return newHeatmapData;
    });

    // Notify parent component of checklist change
    onChecklistChange();

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

  // Render loading state or table with problem data
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
                      className={`bg-white border-b hover:bg-gray-50 `}
                      style={{backgroundColor: `${problem?.Done ? '#B9E2A7' : ''}`}}
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