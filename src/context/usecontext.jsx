import React, { createContext, useState, useCallback } from "react";

export const UserContext = createContext();

const Words = [
  "Definitely",
  "Separate",
  "Accommodate",
  "Embarrass",
  "Occurrence",
  "Necessary",
  "Receive",
  "Believe",
  "Weird",
  "Conscience",
  "Conscious",
  "Rhythm",
  "Maintenance",
  "Privilege",
  "Recommend",
  "Surprise",
  "February",
  "Wednesday",
  "Library",
  "Probably",
  "Temperature",
  "Government",
  "Environment",
  "Jewelry",
  "Athlete",
  "Specifically",
  "Basically",
  "Comfortable",
  "Vegetable",
  "Interesting",
  "Restaurant",
  "Schedule",
  "Colonel",
  "Lieutenant",
  "Queue",
  "Tongue",
  "Gauge",
  "Subtle",
  "Debt",
  "Doubt",
  "Island",
  "Aisle",
  "Debris",
  "Receipt",
  "Psychology",
  "Pneumonia",
  "Honest",
  "Hour",
  "Heir",
  "Rhetoric",
  "Diarrhea",
  "Nausea",
  "Mischievous",
  "Height",
  "Foreign",
  "Sovereign",
  "Guarantee",
  "Vacuum",
  "Bureau",
  "Entrepreneur",
  "Rendezvous",
  "Liaison",
  "Camouflage",
  "Choir",
  "Ignorant",
  "Independent",
  "Intelligence",
  "Knowledge",
  "Acquaintance",
  "Acquire",
  "Apparent",
  "Argument",
  "Truly",
  "Awkward",
  "Calendar",
  "Category",
  "Cemetery",
  "Changeable",
  "Collectible",
  "Committed",
  "Concede",
  "Controversy",
  "Coolly",
  "Criticize",
  "Disappoint",
  "Ecstasy",
  "Exceed",
  "Existence",
  "Experience",
  "Fiery",
  "Finally",
  "Fluorescent",
  "Grateful",
  "Harass",
  "Humorous",
  "Immediately",
  "Millennium",
  "Minuscule",
  "Noticeable",
  "Occasionally",
  "Pastime",
  "Persevere",
  "Personnel",
  "Playwright",
  "Precede",
  "Principal",
  "Proceed",
  "Professor",
  "Pronunciation",
  "Questionnaire",
  "Relevant",
  "Siege",
  "Supersede",
  "Threshold",
  "Tomorrow",
  "Twelfth",
  "Until",
  "Withhold",
  "Native",
  "Foliage",
  "Encased",
  "Cuisine",
  "Medicinal",
  "Preservative",
  "Exclusive",
  "Importers",
  "Revealed",
  "Valuable",
  "Commodity",
  "Dominance",
  "Exploiting",
  "Precious",
  "Competition",
  "Distribution",
  "Commercial",
  "Fleet",
  "Corporation",
  "Employees",
  "Contagious",
  "Desperate",
  "Original",
  "Opportunity",
  "Neutral",
  "Policy",
  "Invaders",
  "Investment",
  "Concentrated",
  "Authority",
  "Punished",
  "Exported",
  "Fertile",
  "Obstacle",
  "Compromise",
  "Settlement",
  "Distant",
  "Monopoly",
  "Smuggled",
  "Thrived",
  "Volcanic",
  "Eruption",
  "Tsunami",
  "Seized",
  "Transplanting",
  "Estimated",
  "Average",
  "Automotive",
  "Adapting",
  "Automation",
  "Implementation",
  "Significant",
  "Reliability",
  "Flexibility",
  "Vehicle",
  "Horizon",
  "Manufacturing",
  "Capabilities",
  "Assistance",
  "Progress",
  "Motive",
  "Collisions",
  "Contributory",
  "Factor",
  "Primary",
  "Incidence",
  "Productive",
  "Socialise",
  "Responsibility",
  "Mobility",
  "Disabled",
  "Autonomy",
  "Implications",
  "Initiatives",
  "Viable",
  "Urban",
  "Demand",
  "Proportion",
  "Automated",
  "Required",
  "Mileage",
  "Consequence",
  "Intensively",
  "Turnover",
  "Consumers",
  "Access",
  "Provider",
  "Freedom",
  "Requirements",
  "Efficient",
  "Specialised",
  "Exceptional",
  "Hurdles",
  "Technical",
  "Difficulties",
  "Ensuring",
  "Infinite",
  "Encounter",
  "Regulatory",
  "Liability",
  "Enforcement",
  "Essential",
  "Societal",
  "Landscape",
  "Addressed",
  "Robust",
  "Targeted",
  "Conquered",
  "Potentially",
  "Association",
  "Developments",
  "Virtual reality",
  "Concrete",
  "Predictions",
  "Vital",
  "Exploration",
  "Desire",
  "Discover",
  "Knowledge",
  "Species",
  "Ancestors",
  "Value",
  "Investigate",
  "Unknown",
  "Questing",
  "Peculiar",
  "Instinct",
  "Professions",
  "Biologist",
  "Astronomer",
  "Borders",
  "Landscape",
  "Suggest",
  "Humanity",
  "Remote",
  "Existence",
  "Irrelevant",
  "Background",
  "Encounters",
  "Relatively",
  "Confined",
  "Associated",
  "Decline",
  "Bacteria",
  "Scarcely",
  "Physically",
  "Campaigner",
  "Regardless",
  "Definition",
  "Reflect",
  "Pioneer",
  "Historian",
  "Scientist",
  "Criteria",
  "Approach",
  "Definite",
  "Objective",
  "Expeditions",
  "Unique",
  "Isolated",
  "Interpretation",
  "Insights",
  "Behaviour",
];

const UserContextProvider = (props) => {
  const [userScore, setUserScore] = useState(0);
  const [gameState, setGameState] = useState("idle"); // 'idle', 'running', 'finished'
  const [finalScore, setFinalScore] = useState(null);

  const randomWord = useCallback(() => {
    if (Words && Words.length > 0) {
      return Words[Math.floor(Math.random() * Words.length)];
    }
    return "";
  }, []);

  const startGame = useCallback(() => {
    console.log("Starting game...");
    setUserScore(0);
    setFinalScore(null);
    setGameState("running");
  }, []);

  const endGame = useCallback(() => {
    console.log("Ending game...");
    setFinalScore(userScore);
    setGameState("finished");
  }, [userScore]);

  const resetGame = useCallback(() => {
    console.log("Resetting game state...");
    setUserScore(0);
    setFinalScore(null);
    setGameState("idle");
  }, []);

  return (
    <UserContext.Provider
      value={{
        randomWord,
        userScore,
        setUserScore,
        gameState,
        finalScore,
        startGame,
        endGame,
        resetGame,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
