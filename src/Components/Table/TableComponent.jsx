import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import './styles.css'; // Ensure your CSS file is imported

const TableComponent = ({ problems }) => {
  const [sortOrder, setSortOrder] = useState('easy');
  const [selectedProblems, setSelectedProblems] = useState(new Set());
  const [celebrate, setCelebrate] = useState(false);

  const getSortedProblems = () => {
    const difficultyOrder = {
      easy: ['easy', 'medium', 'hard'],
      medium: ['medium', 'easy', 'hard'],
      hard: ['hard', 'easy', 'medium']
    };

    return [...problems].sort((a, b) => {
      const order = difficultyOrder[sortOrder];
      return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
    });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCheckboxChange = (problem) => {
    setSelectedProblems((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(problem)) {
        newSelection.delete(problem);
      } else {
        newSelection.add(problem);
      }
      // Trigger celebration animation and confetti on selection
      setCelebrate(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9A8B', '#FF6F61', '#D83A56'] // Customize colors
      });
      setTimeout(() => setCelebrate(false), 1000); // Hide animation after 1s
      return newSelection;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProblems(new Set(problems));
    } else {
      setSelectedProblems(new Set());
    }
  };

  return (
    <div className="flex flex-col">
      {celebrate && <div className="celebrate-animation"></div>}
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg border-black border rounded-2xl" style={{borderColor: "rgb(0,0,0,0.1)"}}>
            <div className="flex justify-between items-center px-6 py-4 bg-[#ffd287a3]">
              <span className="text-lg font-medium text-gray-900">Problems</span>
              <div className="flex items-center">
                <label htmlFor="difficulty" className="mr-2 text-xs font-normal text-gray-700">
                  Sort by Difficulty:
                </label>
                <select
                  id="difficulty"
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="block w-full px-3 py-2 border border-black-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{borderColor: "rgb(0,0,0,0.1)"}}
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
                    <p className='text-sm font-normal text-center' >Checkbox</p>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    
                  </th>
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
                    Link 1
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Link 2
                  </th>
                </tr>
              </thead>
              <tbody className='border-black border-t-2' style={{borderColor: "rgb(0,0,0,0.1)"}}>
                {getSortedProblems().map((problem, index) => (
                  <tr
                    key={index}
                    className={`bg-white border-b hover:bg-gray-50 ${
                      selectedProblems.has(problem) ? 'bg-green-100' : ''
                    }`}
                  >
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-center border-none">
                      <input
                        type="checkbox"
                        checked={selectedProblems.has(problem)}
                        onChange={() => handleCheckboxChange(problem)}
                        className="custom-checkbox"
                      />
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm border-none font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap border-none">
                      <a href='https://www.google.com' target='_blank' >{problem.name}</a>
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none" style={{ color : problem.difficulty == 'easy' ? '#1CBABA': problem.difficulty == 'medium' ? '#FF9800':'#F44336'}} >
                      {problem.difficulty[0].toUpperCase() + problem.difficulty.slice(1)}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-none">
                      <a href='https://www.google.com' target='_blank'>Link</a>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-none">
                      <a href='https://www.google.com' target='_blank'>Link</a>
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
};

export default TableComponent;