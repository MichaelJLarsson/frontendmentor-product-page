import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";

// Constants
const MAX_TIME_SECONDS = 300; // 5 minutes
const MIN_TIME_SECONDS = 1;
const MAX_INTERVALS = 20;
const MIN_INTERVALS = 1;

function IntervalTimer() {
  // Timer settings
  const [warmupTime, setWarmupTime] = useState(10);
  const [trainingTime, setTrainingTime] = useState(30);
  const [restTime, setRestTime] = useState(15);
  const [intervals, setIntervals] = useState(5);

  // Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("idle"); // idle, warmup, training, rest, complete
  const [currentInterval, setCurrentInterval] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const intervalRef = useRef(null);

  // Start timer
  const startTimer = () => {
    if (currentPhase === "idle" || currentPhase === "complete") {
      setCurrentPhase("warmup");
      setCurrentInterval(1);
      setTimeLeft(warmupTime);
    }
    setIsRunning(true);
  };

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setCurrentPhase("idle");
    setCurrentInterval(0);
    setTimeLeft(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Timer logic
  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Move to next phase
      if (currentPhase === "warmup") {
        setCurrentPhase("training");
        setTimeLeft(trainingTime);
      } else if (currentPhase === "training") {
        if (currentInterval < intervals) {
          setCurrentPhase("rest");
          setTimeLeft(restTime);
        } else {
          setCurrentPhase("complete");
          setIsRunning(false);
        }
      } else if (currentPhase === "rest") {
        setCurrentInterval((prev) => prev + 1);
        setCurrentPhase("training");
        setTimeLeft(trainingTime);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, currentPhase, currentInterval, intervals, trainingTime, restTime]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Adjust setting with min/max bounds
  const adjustSetting = (setter, value, delta, min = MIN_TIME_SECONDS, max = MAX_TIME_SECONDS) => {
    if (!isRunning && currentPhase === "idle") {
      const newValue = Math.max(min, Math.min(max, value + delta));
      setter(newValue);
    }
  };

  // Get phase color
  const getPhaseColor = () => {
    switch (currentPhase) {
      case "warmup":
        return "from-yellow-400 to-orange-500";
      case "training":
        return "from-green-400 to-emerald-600";
      case "rest":
        return "from-blue-400 to-indigo-600";
      case "complete":
        return "from-purple-400 to-pink-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  // Get phase label
  const getPhaseLabel = () => {
    switch (currentPhase) {
      case "warmup":
        return "Warm Up";
      case "training":
        return `Training - Round ${currentInterval}/${intervals}`;
      case "rest":
        return `Rest - After Round ${currentInterval}`;
      case "complete":
        return "Workout Complete!";
      default:
        return "Ready to Start";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Timer Display */}
        <div className={`bg-gradient-to-br ${getPhaseColor()} rounded-3xl p-8 shadow-2xl mb-6`}>
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-4">{getPhaseLabel()}</h2>
            <div className="text-white text-7xl font-bold mb-2 font-mono">
              {currentPhase !== "idle" ? formatTime(timeLeft) : "--:--"}
            </div>
            {currentPhase !== "idle" && currentPhase !== "complete" && (
              <div className="text-white/80 text-lg">
                Total Rounds: {currentInterval}/{intervals}
              </div>
            )}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          {!isRunning && currentPhase !== "complete" && (
            <button
              onClick={startTimer}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-6 shadow-lg transition-all transform hover:scale-105"
              aria-label="Start"
            >
              <Play className="w-8 h-8" fill="white" />
            </button>
          )}
          {isRunning && (
            <button
              onClick={pauseTimer}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-6 shadow-lg transition-all transform hover:scale-105"
              aria-label="Pause"
            >
              <Pause className="w-8 h-8" fill="white" />
            </button>
          )}
          <button
            onClick={resetTimer}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-6 shadow-lg transition-all transform hover:scale-105"
            aria-label="Reset"
          >
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>

        {/* Settings */}
        {currentPhase === "idle" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-white text-xl font-bold mb-4 text-center">Timer Settings</h3>

            {/* Warmup Time */}
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
              <span className="text-white font-medium">Warm Up</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustSetting(setWarmupTime, warmupTime, -5)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all"
                  aria-label="Decrease warmup time"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-white text-xl font-mono w-20 text-center">
                  {formatTime(warmupTime)}
                </span>
                <button
                  onClick={() => adjustSetting(setWarmupTime, warmupTime, 5)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all"
                  aria-label="Increase warmup time"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Training Time */}
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
              <span className="text-white font-medium">Training</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustSetting(setTrainingTime, trainingTime, -5)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all"
                  aria-label="Decrease training time"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-white text-xl font-mono w-20 text-center">
                  {formatTime(trainingTime)}
                </span>
                <button
                  onClick={() => adjustSetting(setTrainingTime, trainingTime, 5)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all"
                  aria-label="Increase training time"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Rest Time */}
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
              <span className="text-white font-medium">Rest</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustSetting(setRestTime, restTime, -5)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all"
                  aria-label="Decrease rest time"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-white text-xl font-mono w-20 text-center">
                  {formatTime(restTime)}
                </span>
                <button
                  onClick={() => adjustSetting(setRestTime, restTime, 5)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all"
                  aria-label="Increase rest time"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Intervals */}
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
              <span className="text-white font-medium">Intervals</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustSetting(setIntervals, intervals, -1, MIN_INTERVALS, MAX_INTERVALS)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all"
                  aria-label="Decrease intervals"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-white text-xl font-mono w-20 text-center">{intervals}</span>
                <button
                  onClick={() => adjustSetting(setIntervals, intervals, 1, MIN_INTERVALS, MAX_INTERVALS)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all"
                  aria-label="Increase intervals"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary when paused or running */}
        {currentPhase !== "idle" && currentPhase !== "complete" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-white text-lg font-bold mb-3 text-center">Workout Plan</h3>
            <div className="space-y-2 text-white/80">
              <div className="flex justify-between">
                <span>Warm Up:</span>
                <span className="font-mono">{formatTime(warmupTime)}</span>
              </div>
              <div className="flex justify-between">
                <span>Training:</span>
                <span className="font-mono">{formatTime(trainingTime)}</span>
              </div>
              <div className="flex justify-between">
                <span>Rest:</span>
                <span className="font-mono">{formatTime(restTime)}</span>
              </div>
              <div className="flex justify-between">
                <span>Intervals:</span>
                <span className="font-mono">{intervals}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IntervalTimer;
