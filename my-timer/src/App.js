import React from "react";
import CountdownTimer from "./CountdownTimer";
import RewardDayTimer from "./RewardDayTimer";

function App() {
  return (
    <div className="App">
      <header>
       
      </header>
      <div className="timer-row">
        <CountdownTimer />
        <RewardDayTimer />
      </div>
    </div>
  );
}

export default App;
