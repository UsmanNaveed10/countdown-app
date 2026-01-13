import React from "react";
import CountdownTimer from "./CountdownTimer";
import RewardDayTimer from "./RewardDayTimer";
import "./CountdownTimer.css"; // same CSS is fine

const TimerPage = () => {
  return (
    <div className="timer-row">
      <CountdownTimer />
      <RewardDayTimer />
    </div>
  );
};

export default TimerPage;
