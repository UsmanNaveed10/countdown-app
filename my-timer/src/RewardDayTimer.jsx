import React, { useEffect, useState, useRef } from "react";
import "./CountdownTimer.css";

const RewardDayTimer = () => {
  const [days, setDays] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startCountdown = () => {
    clearInterval(intervalRef.current);

    const total = (parseInt(days) || 0) * 24 * 3600;
    if (total <= 0) {
      alert("Please enter a positive number of days!");
      return;
    }

    setTotalSeconds(total);
    localStorage.setItem("rewardCountdownTotalSeconds", total);

    const endTime = Date.now() + total * 1000;
    localStorage.setItem("rewardCountdownEndTime", endTime);

    runTimer();
  };

  const runTimer = () => {
    intervalRef.current = setInterval(() => {
      const storedEnd = localStorage.getItem("rewardCountdownEndTime");
      const storedTotal = localStorage.getItem("rewardCountdownTotalSeconds");
      if (!storedEnd || !storedTotal) return;

      const total = parseInt(storedTotal);
      let remaining = Math.ceil((storedEnd - Date.now()) / 1000);

      if (remaining <= 0) {
        remaining = 0;
        clearInterval(intervalRef.current);
        localStorage.removeItem("rewardCountdownEndTime");
        localStorage.removeItem("rewardCountdownTotalSeconds");
        alert("Time's up!");
      }

      setRemainingSeconds(remaining);
      setTotalSeconds(total);
    }, 1000);
  };

  useEffect(() => {
    const storedEnd = localStorage.getItem("rewardCountdownEndTime");
    const storedTotal = localStorage.getItem("rewardCountdownTotalSeconds");
    if (storedEnd && storedTotal) runTimer();

    return () => clearInterval(intervalRef.current);
  }, []);

  const percentagePassed =
    totalSeconds > 0
      ? (((totalSeconds - remainingSeconds) / totalSeconds) * 100).toFixed(1)
      : 0;

  return (
    <div className="timer-wrapper">
      <h1>Reward Day</h1>

      <div className="inputs">
        <input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <button onClick={startCountdown}>Start</button>
      </div>

      <div id="totalSeconds">Total Seconds: {totalSeconds}</div>

      <div id="timer" className={remainingSeconds % 300 === 0 ? "milestone" : ""}>
        {remainingSeconds}
      </div>

      <div id="percentage">Time Passed: {percentagePassed}%</div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${percentagePassed}%` }}
        ></div>

        {/* Internal bars */}
        {Array.from({length: 7}, (_, i) => (
          <div key={i} className="interval-marker" style={{ left: `${(i+1)*12.5}%` }}></div>
        ))}
      </div>
    </div>
  );
};

export default RewardDayTimer;