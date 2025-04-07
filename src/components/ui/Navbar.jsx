// components/ui/Navbar.jsx
import React, { useContext } from "react";
import { UserContext } from "../../context/usecontext"; // Adjust path if needed
import { Badge } from "@/components/ui/badge"; // Import Shadcn Badge

const Navbar = () => {
  const { gameState, finalScore } = useContext(UserContext);

  return (
    // Use Shadcn background/border classes (assuming default theme)
    <header className="w-full border-b bg-background shadow-sm sticky top-0 z-10">
      <nav className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {/* Add Link components from your router if needed */}
          <a href="#" className="hover:text-foreground">
            Home
          </a>
          <a href="#" className="hover:text-foreground">
            About
          </a>
        </div>

        <div>
          {/* Display score using Shadcn Badge */}
          {gameState === "finished" && finalScore !== null && (
            <Badge variant="secondary" className="text-sm">
              {" "}
              {/* Use a Shadcn variant */}
              Last Score: {finalScore}
            </Badge>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
