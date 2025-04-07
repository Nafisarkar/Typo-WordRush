import React, { useState, useEffect, useRef } from "react";

const Clock = ({ duration = 60, isRunning, onTimeUp, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isRunning) {
      if (timeLeft > 0) {
        intervalRef.current = setInterval(() => {
          setTimeLeft((prevTime) => {
            const newTime = prevTime - 1;
            if (onTick) {
              onTick(newTime);
            }
            if (newTime <= 0) {
              clearInterval(intervalRef.current); 
              if (onTimeUp) {
                onTimeUp(); 
              }
              return 0; 
            }
            return newTime;
          });
        }, 1000);
      } else {
        if (onTimeUp) {
          onTimeUp();
        }
      }
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, onTimeUp, onTick]); 

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center space-y-2 p-4">
      {" "}
      <p className="text-sm text-gray-600 uppercase font-semibold">Time Left</p>

      <h1
        className="text-6xl font-mono text-slate-700"
        suppressHydrationWarning
      >
        {formatTime(timeLeft)}
      </h1>
    </div>
  );
};

export default Clock;
