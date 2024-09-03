import React from "react";
import RectangularProgressBar from "../Tools/RectangularProgressBar/RectangularProgressBar";

const TopicwiseAnalytics = () => {
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
          <RectangularProgressBar completedProblems={20} TotProbs={100} topicName={"Arrays"} />
          <RectangularProgressBar completedProblems={40} TotProbs={100} topicName={"Dynamic Programming"} />
          <RectangularProgressBar completedProblems={20} TotProbs={100} topicName={"Strings"} />
          <RectangularProgressBar completedProblems={40} TotProbs={100} topicName={"Linked Lists"} />
          <RectangularProgressBar completedProblems={60} TotProbs={100} topicName={"Recursion"} />
          <RectangularProgressBar completedProblems={70} TotProbs={100} topicName={"Binary Trees"} />
          <RectangularProgressBar completedProblems={40} TotProbs={100} topicName={"BST"} />
          <RectangularProgressBar completedProblems={10} TotProbs={100} topicName={"Greedy"} />
          <RectangularProgressBar completedProblems={5} TotProbs={100} topicName={"Graphs"} />
          <RectangularProgressBar completedProblems={80} TotProbs={100} topicName={"Heap"} />
          <RectangularProgressBar completedProblems={90} TotProbs={100} topicName={"Stacks"} />
          <RectangularProgressBar completedProblems={2} TotProbs={100} topicName={"Queues"} />
      </div>
    </div>
  );
};

export default TopicwiseAnalytics;
