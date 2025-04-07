import React from "react";
import UserContextProvider from "./context/usecontext"; // Adjust path
import Homepage from "./page/Homepage"; // Adjust path
import useSound from "use-sound";
import boopSfx from "./assets/audios/ambiance.mp3"; // Adjust path

const App = () => {
  const [play, { stop }] = useSound(boopSfx, {
    volume: 0.01,
    loop: true,
  });
  const [hasInteracted, setHasInteracted] = React.useState(false);

  React.useEffect(() => {
    if (hasInteracted) {
      play();
    }
    return () => {
      stop();
    };
  }, [play, stop, hasInteracted]);

  React.useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        console.log("User interaction detected, enabling sound.");
        setHasInteracted(true);
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);
      }
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted]);
  return (
    <UserContextProvider>
      <Homepage />
    </UserContextProvider>
  );
};

export default App;
