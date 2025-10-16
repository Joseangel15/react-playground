'use client'
import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (totalSeconds: number) => {
    const hours: number | string =
      Math.floor(totalSeconds / 3600) < 10
        ? "0" + Math.floor(totalSeconds / 3600)
        : Math.floor(totalSeconds / 3600);
    const minutes: number | string =
      Math.floor(totalSeconds / 60) < 10
        ? "0" + Math.floor(totalSeconds / 60)
        : Math.floor(totalSeconds / 60);
    const seconds: number | string =
      totalSeconds % 60 < 10 ? "0" + (totalSeconds % 60) : totalSeconds % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  function handleStartButton() {
    if (!isRunning) {
      setIsRunning(true);
    }
  }

  function handleStopTimerButton() {
    setIsRunning(false);
  }

  function handleResetButton() {
    handleStopTimerButton();
    setTime(0);
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }

    // Cleanup
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div className="pt-5 pb-10">
      <h1 className="text-center pb-5 text-4xl">React Projects</h1>
      <section className="flex flex-col items-center">
        <h2 className="text-2xl">React Timer</h2>
        <div className="pt-5">
          <p className="text-3xl">{formatTime(time)}</p>
        </div>
        <div className="flex gap-2.5 pt-5 pb-5">
          <button
            onClick={handleStartButton}
            className="start-btn p-3.5 rounded-2xl border-2 cursor-pointer"
          >
            Start
          </button>
          <button
            onClick={handleStopTimerButton}
            className="stop-btn p-3.5 rounded-2xl border-2 cursor-pointer"
          >
            Stop
          </button>
        </div>
        <div>
          <button
            onClick={handleResetButton}
            className="reset btn p-3.5 rounded-2xl border-2 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
}
