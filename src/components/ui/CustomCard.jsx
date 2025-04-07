import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/usecontext";
import useSound from "use-sound";
import clickSfx from "../../assets/audios/fx1.wav";
import backspaceSfx from "../../assets/audios/fx2.wav";
import wowSfx from "../../assets/audios/wow.mp3";

import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const getInitialWord = (randomWordFunc) => {
  const word = randomWordFunc();
  return word ? word.toLowerCase() : "";
};

const CustomCard = ({ duration = 60, isRunning, onTimeUp }) => {
  const { userScore, randomWord, setUserScore, gameState } =
    useContext(UserContext);
  const [playKeySound] = useSound(clickSfx, { volume: 0.1 });
  const [playBackspaceSound] = useSound(backspaceSfx, { volume: 0.1 });
  const [playWowSound] = useSound(wowSfx, { volume: 0.2 });
  const [isWowSoundPlayed, setIsWowSoundPlayed] = useState(false);

  const [words, setWords] = useState(() => getInitialWord(randomWord));
  const [tempWord, setTempWord] = useState("");

  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  const wordsRef = useRef(words);
  const tempWordRef = useRef(tempWord);
  const userScoreRef = useRef(userScore);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);
  useEffect(() => {
    tempWordRef.current = tempWord;
  }, [tempWord]);
  useEffect(() => {
    userScoreRef.current = userScore;
  }, [userScore]);

  useEffect(() => {
    if (isRunning || gameState === "idle" || gameState === "finished") {
      setTimeLeft(duration);
    }
  }, [isRunning, duration, gameState]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(intervalRef.current);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      if (isRunning && timeLeft <= 0) {
        if (onTimeUp) onTimeUp();
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, onTimeUp]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameState !== "running") return;

      const currentTempWord = tempWordRef.current;
      const currentWords = wordsRef.current;

      if (event.key === "Enter") {
        const comparisonWord = currentWords || "";
        if (currentTempWord === comparisonWord && comparisonWord !== "") {
          setUserScore((prevScore) => {
            const newScore = prevScore + 10;
            if (prevScore < 100 && newScore >= 100) {
              console.log("Score crossed 100! Playing WOW sound.");
              if (!isWowSoundPlayed) {
                playWowSound();
                setIsWowSoundPlayed(true);
              }
            }
            return newScore;
          });

          setWords(getInitialWord(randomWord));
          setTempWord("");
        } else if (currentTempWord !== "" || comparisonWord !== "") {
          setUserScore((prev) =>
            Math.max(0, prev - (comparisonWord.length || 1))
          );
          setWords(getInitialWord(randomWord));
          setTempWord("");
        }
      } else if (event.key === "Backspace") {
        setTempWord((prev) => prev.slice(0, -1));
        playBackspaceSound();
      } else if (event.key.match(/^[a-zA-Z]$/)) {
        const typedLetter = event.key.toLowerCase();
        if (currentTempWord.length < currentWords.length) {
          setTempWord((prev) => prev + typedLetter);
          playKeySound();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    gameState,
    randomWord,
    setUserScore,
    playKeySound,
    playBackspaceSound,
    playWowSound,
    isWowSoundPlayed,
  ]);

  // --- Clock Formatting Function ---
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  const renderHighlightedWord = () => {
    return (tempWord || "").split("").map((char, index) => (
      <span
        key={index}
        className={`uppercase transition-colors duration-150 ${
          index < words.length && char === words[index]
            ? "text-green-500 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
      >
        {char}
      </span>
    ));
  };

  const renderPlaceholders = () => {
    return (
      words &&
      Array(Math.max(0, words.length - (tempWord?.length || 0)))
        .fill("_")
        .map((_, index) => (
          <span
            key={`placeholder-${index}`}
            className="text-muted-foreground/50 uppercase"
          >
            _
          </span>
        ))
    );
  };

  return (
    <ShadcnCard
      className={`w-full max-w-lg transition-opacity duration-300 ${
        isRunning ? "opacity-70" : "opacity-60"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">Typing Test</CardTitle>
          <CardDescription>Score: {userScore}</CardDescription>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase font-semibold">
            Time Left
          </p>
          <div
            className="text-2xl font-bold font-mono"
            suppressHydrationWarning
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-4">
        {gameState !== "running" && (
          <div className="mb-4 text-muted-foreground text-sm">
            {gameState === "idle" ? "Press Escape key to start!" : "Game Over!"}
          </div>
        )}
        <div className="mb-6 text-center">
          <p className="text-xs text-muted-foreground uppercase font-semibold">
            Type the word:
          </p>
          <h3 className="text-4xl md:text-5xl font-semibold text-card-foreground tracking-widest font-mono uppercase">
            {words || "---"}
          </h3>
        </div>
        <div className="text-4xl md:text-5xl font-semibold mb-6 font-mono flex h-[1.5em] items-center justify-center bg-muted p-2 rounded-md w-full min-h-[70px] overflow-hidden">
          {renderHighlightedWord()}
          {renderPlaceholders()}
        </div>
      </CardContent>
    </ShadcnCard>
  );
};

export default CustomCard;
