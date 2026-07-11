import { useEffect, useState } from "react";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";

const FOCUS_DURATION_SECONDS = 25 * 60;

export default function PomodoroTimer() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isWidgetMode, setIsWidgetMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION_SECONDS);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isTimerRunning) return undefined;

    const timerId = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(timerId);
          setIsTimerRunning(false);
          setIsCompleted(true);
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const enterWidgetMode = async () => {
    const appWindow = getCurrentWindow();

    try {
      await appWindow.setResizable(true);
      await appWindow.setDecorations(false);
      await appWindow.setSize(new LogicalSize(300, 150));
      await appWindow.setAlwaysOnTop(true);
      await appWindow.setResizable(false);
    } catch (error) {
      console.error("Gagal masuk mode widget:", error);
    }
  };

  const exitWidgetMode = async () => {
    const appWindow = getCurrentWindow();

    try {
      await appWindow.setResizable(true);
      await appWindow.setDecorations(true);
      await appWindow.setSize(new LogicalSize(800, 600));
      await appWindow.setAlwaysOnTop(false);
      await appWindow.setResizable(false);
    } catch (error) {
      console.error("Gagal keluar dari mode widget:", error);
    }
  };

  const handleStartTimer = async () => {
    setIsCompleted(false);
    setTimeLeft(FOCUS_DURATION_SECONDS);
    setIsWidgetMode(true);
    setIsTimerRunning(true);
    await enterWidgetMode();
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleRestartTimer = async () => {
    setIsCompleted(false);
    setTimeLeft(FOCUS_DURATION_SECONDS);
    setIsWidgetMode(true);
    setIsTimerRunning(true);
    await enterWidgetMode();
  };

  const handleStopOrBreak = async () => {
    setIsTimerRunning(false);
    setIsWidgetMode(false);
    setIsCompleted(false);
    setTimeLeft(FOCUS_DURATION_SECONDS);
    await exitWidgetMode();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full p-4 bg-gray-900 text-white select-none"
      style={{ WebkitAppRegion: isWidgetMode ? "drag" : "auto" } as any}
    >
      {isWidgetMode && <div className="absolute inset-x-0 top-0 h-8" />}
      <h1 className="text-2xl font-bold mb-4">
        {isTimerRunning ? "Focus Session" : isCompleted ? "Session Complete" : "ZenSpace"}
      </h1>

      <div className="text-4xl font-mono mb-4">{formatTime(timeLeft)}</div>

      <div className="flex flex-wrap justify-center gap-2" style={{ WebkitAppRegion: "no-drag" } as any}>
        {!isTimerRunning && !isCompleted && timeLeft === FOCUS_DURATION_SECONDS ? (
          <button
            onClick={handleStartTimer}
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Start Focus
          </button>
        ) : null}

        {isTimerRunning ? (
          <button
            onClick={handlePauseTimer}
            className="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Pause
          </button>
        ) : null}

        {!isTimerRunning && timeLeft < FOCUS_DURATION_SECONDS ? (
          <button
            onClick={handleStartTimer}
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Resume
          </button>
        ) : null}

        <button
          onClick={handleRestartTimer}
          className="bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Restart
        </button>

        <button
          onClick={handleStopOrBreak}
          className="bg-rose-600 hover:bg-rose-500 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Back to App
        </button>
      </div>
    </div>
  );
}