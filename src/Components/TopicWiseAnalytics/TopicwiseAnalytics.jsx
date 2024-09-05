import React from "react";
import RectangularProgressBar from "../Tools/RectangularProgressBar/RectangularProgressBar";

const TopicwiseAnalytics = ({sheets}) => {
  const topicNames = [
    "Array",
    "Dynamic Programming",
    "Strings",
    "LinkedList",
    "Recursion",
    "Binary Trees",
    "Binary Search",
    "Greedy",
    "Graphs",
    "Heap",
    "Stacks",
    "Queues"
  ];

  const calculateTopicData = (sheets, topicName) => {
    let completedProblems = 0;
    let totalProblems = 0;

    sheets.forEach((sheet) => {
      sheet.problems.forEach((problem) => {
        if (problem.topicName === topicName) {
          totalProblems += problem.questions.length;
          completedProblems += problem.questions.filter(q => q.Done).length;
        }
      });
    });

    return { completedProblems, totalProblems };
  };

  // Calculate Miscellaneous data
  const calculateMiscellaneousData = (sheets) => {
    let completedProblems = 0;
    let totalProblems = 0;

    sheets.forEach((sheet) => {
      sheet.problems.forEach((problem) => {
        if (!topicNames.includes(problem.topicName)) {
          totalProblems += problem.questions.length;
          completedProblems += problem.questions.filter(q => q.Done).length;
        }
      });
    });

    return { completedProblems, totalProblems };
  };

  // Get data for all topics and Miscellaneous
  const topicData = topicNames.map(topicName => ({
    topicName,
    ...calculateTopicData(sheets, topicName)
  }));

  const miscellaneousData = calculateMiscellaneousData(sheets);

  return (
    <div
      className="w-full px-8 py-4 flex flex-col justify-around  mt-4 box-border border border-black rounded-2xl"
      style={{ borderColor: "rgb(0,0,0,0.1)" }}
    >
      <div
        className="border-b border-black w-full"
        style={{ borderColor: "rgb(0,0,0,0.1)" }}
      >
        <h1 className="text-sm pb-2 font-semibold text-left">
          Topic-wise Analytics
        </h1>
      </div>
      <div className="mt-4 flex gap-2 justify-around" >
      {topicNames?.map((topicName) => {
          const { completedProblems, totalProblems } = calculateTopicData(sheets, topicName);
          return (
            <RectangularProgressBar
              key={topicName}
              completedProblems={completedProblems}
              TotProbs={totalProblems}
              topicName={topicName}
            />
          );
        })}
        {miscellaneousData.totalProblems > 0 && (
          <RectangularProgressBar
            key="Miscellaneous"
            completedProblems={miscellaneousData.completedProblems}
            TotProbs={miscellaneousData.totalProblems}
            topicName="Miscellaneous"
          />
        )}
      </div>
    </div>
  );
};

export default TopicwiseAnalytics;
