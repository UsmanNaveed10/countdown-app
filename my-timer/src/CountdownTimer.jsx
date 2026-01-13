import React, { useEffect, useState, useRef } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startCountdown = () => {
    clearInterval(intervalRef.current);

    const total =
      (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60;
    if (total <= 0) {
      alert("Please enter a positive time!");
      return;
    }

    setTotalSeconds(total);
    localStorage.setItem("countdownTotalSeconds", total);

    const endTime = Date.now() + total * 1000;
    localStorage.setItem("countdownEndTime", endTime);

    runTimer();
  };

  const runTimer = () => {
    intervalRef.current = setInterval(() => {
      const storedEnd = localStorage.getItem("countdownEndTime");
      const storedTotal = localStorage.getItem("countdownTotalSeconds");
      if (!storedEnd || !storedTotal) return;

      const total = parseInt(storedTotal);
      let remaining = Math.ceil((storedEnd - Date.now()) / 1000);

      if (remaining <= 0) {
        remaining = 0;
        clearInterval(intervalRef.current);
        localStorage.removeItem("countdownEndTime");
        localStorage.removeItem("countdownTotalSeconds");
        alert("Time's up!");
      }

      setRemainingSeconds(remaining);
      setTotalSeconds(total);
    }, 1000);
  };

  useEffect(() => {
    const storedEnd = localStorage.getItem("countdownEndTime");
    const storedTotal = localStorage.getItem("countdownTotalSeconds");
    if (storedEnd && storedTotal) runTimer();

    return () => clearInterval(intervalRef.current);
  }, []);

  const imageSequence = ['1.jpg', '2.jpeg', '3.jpeg', '4.jpg', '5.jpg', '6.png', '7.jpeg', '8.jpeg'];

  const percentagePassed =
    totalSeconds > 0
      ? (((totalSeconds - remainingSeconds) / totalSeconds) * 100).toFixed(1)
      : 0;

  const currentInterval = percentagePassed > 0 ? Math.ceil(percentagePassed / 12.5) : 0;
  const imageIndex = currentInterval > 0 ? currentInterval - 1 : 0;
  const currentImage = imageSequence[imageIndex] || imageSequence[imageSequence.length - 1];

  return (
    <div className="timer-wrapper">
      <h1>Countdown Timer</h1>

      <div className="inputs">
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
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

        {/* Moving image along with progress */}
        {totalSeconds > 0 && percentagePassed > 0 && (
          <div className="moving-image" style={{ left: `calc(${percentagePassed}% - 40px)` }}>
            <img src={`/${currentImage}`} alt="" className={`interval-image ${currentInterval === 1 ? 'big-image' : ''}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
