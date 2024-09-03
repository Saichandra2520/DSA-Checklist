import React from "react";
import Header from "../../Components/Header/Header";
import CircularProgressBar from "../../Components/Tools/CircularProgressBar/CircularProgressBar";
import Sheetscontainer from "../../Components/Sheetscontainer/Sheetscontainer";
import SheetsWrapper from "../../Components/SheetsWrapper/SheetsWrapper";
import ConsistencyTracker from "../../Components/ConsistencyTracker/ConsistencyTracker";

const HomePage = () => {
  return (
    <div className="w-full">
      <div className="px-10 mx-4" >
      <div
        className="mt-5"
        style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
      >
        <div className="mt-10" style={{ padding: "0 2rem 0 4rem" }}>
          <div>
            <h3 className="font-semibold">Welcome back, Sai Chandra !!</h3>
            <p className="text-sm mt-1">
              {" "}
              Here's your progress and upcoming tasks.
            </p>
          </div>
          <div className="mt-10">
            <SheetsWrapper navigateto='topics'/>
          </div>
        </div>

        <div className="">
          <div>
            <h3 className="font-semibold mt-5">Overall Progress</h3>
            <CircularProgressBar
              radius={100}
              percentage={25}
              color={"#faa71b"}
              progressWidth={24}
            />
            <div>
              <div className="flex flex-wrap mt-2">
                <div className="w-1/2">
                  <div className="flex items-center mb-2">
                    <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: '#2496EF' }}></span>
                    <p className="cursor-pointer">Overall</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                    <p className="cursor-pointer">Arrays</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
                    <p className="cursor-pointer">Strings</p>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex items-center mb-2">
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-2"></span>
                    <p className="cursor-pointer">Linked Lists</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-2.5 h-2.5 bg-purple-500 rounded-full mr-2"></span>
                    <p className="cursor-pointer">Graphs</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2"></span>
                    <p className="cursor-pointer">Dynamic Programming</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ConsistencyTracker />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
