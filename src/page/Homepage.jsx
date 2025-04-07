import React, { useContext, useCallback, useEffect } from "react";
import Card from "../components/ui/CustomCard";
import { UserContext } from "../context/usecontext";
import Footer from "@/components/ui/Footer";

const GAME_DURATION = 60;

const Homepage = () => {
  const { gameState, startGame, endGame, setGameState } =
    useContext(UserContext);

  const handleTimeUp = useCallback(() => {
    console.log("Time is up!");
    endGame();
    setGameState("idle");
  }, [endGame, setGameState]);

  useEffect(() => {
    const handleStartKey = (event) => {
      if (gameState === "idle") {
        const activeElement = document.activeElement;
        if (
          activeElement?.tagName !== "INPUT" &&
          activeElement?.tagName !== "TEXTAREA" &&
          activeElement?.tagName !== "BUTTON"
        ) {
          if (event.key == "Escape") {
            startGame();
          }
          console.log("Key pressed while idle - Starting Game!");
        }
      }
    };
    window.addEventListener("keydown", handleStartKey);
    return () => {
      window.removeEventListener("keydown", handleStartKey);
    };
  }, [gameState, startGame]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 to-indigo-200 dark:from-slate-300 dark:to-slate-700">
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
          <Card
            key={gameState}
            duration={GAME_DURATION}
            isRunning={gameState === "running"}
            onTimeUp={handleTimeUp}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
