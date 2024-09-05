import React from "react";
import { useNavigate } from "react-router-dom";
import "./sheetcontainer.css";
import CircularProgressBar from "../Tools/CircularProgressBar/CircularProgressBar";

const Sheetscontainer = ({ data1, data2 }) => {
  const navigate = useNavigate();
  // const [percentage,setPercentage] = useState(0);

  function totalquestions(data) {
    let sum = 0;
    data.map((okay) => {
      sum += okay.questions.length;
    });

    return sum;
  }

  function Donequestions(data) {
    let sum = 0;
    data.map((okay) => {
      sum += okay.doneQuestions;
    });

    return sum;
  }

  function percentage(data) {
    return (Donequestions(data) / totalquestions(data)) * 100;
  }

  return (
    <div className="sheets-container">
      <div className="sheet-item">
        <div className="sheet-item-primary">
          <h2>Love babbar Sheet</h2>
          <h4>Total Questions: {totalquestions(data1)}</h4>
          <h5>
            {Donequestions(data1) > 0
              ? `${totalquestions(data1) - Donequestions(data1)} more to go`
              : "Not Yet Started"}{" "}
            <span>👇</span>
          </h5>
          <button onClick={() => navigate("450lovebabartopics")}>
            {Donequestions(data1) > 0
              ? Donequestions(data1) === totalquestions(data1)
                ? "Completed"
                : "Continue"
              : "Start Now"}
          </button>
        </div>
        <div className="progress-hover">
          <CircularProgressBar
            percentage={percentage(data1)}
            circleWidth="100"
          />
        </div>
      </div>
      <div className="sheet-item">
        <div className="sheet-item-primary">
          <h2>Striver A2Z DSA</h2>
          <h4>Total Questions: {totalquestions(data2)}</h4>
          <h5>
            {Donequestions(data2) > 0
              ? `${totalquestions(data2) - Donequestions(data2)} more to go`
              : "Not Yet Started"}
            <span>👇</span>
          </h5>
          <button onClick={() => navigate("striversheettopics")}>
            {Donequestions(data2) > 0
              ? Donequestions(data2) === totalquestions(data2)
                ? "Completed"
                : "Continue"
              : "Start Now"}
          </button>
        </div>
        <div className="progress-hover">
          <CircularProgressBar
            percentage={percentage(data2)}
            circleWidth="100"
          />
        </div>
      </div>
    </div>
  );
};

export default Sheetscontainer;
