import React from "react";

const Footer = () => {
  const yourName = "Shaon An Nafi";
  const githubUrl = `https://www.shaonannafi.me/`;
  return (
    <footer className="w-full py-4 mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          Made by{" "}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {yourName}
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
