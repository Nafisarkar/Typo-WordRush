import React, { useContext } from "react";
import { UserContext } from "../../context/usecontext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { gameState, finalScore } = useContext(UserContext);

  return (
    <header className="w-full border-b bg-background shadow-sm sticky top-0 z-10">
      <nav className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Home
          </a>
          <a href="#" className="hover:text-foreground">
            About
          </a>
        </div>

        <div>
          {gameState === "finished" && finalScore !== null && (
            <Badge variant="secondary" className="text-sm">
              Last Score: {finalScore}
            </Badge>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
