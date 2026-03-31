import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("smartbank-theme") || "normal");

  useEffect(() => {
    // Apply changes to the body
    document.body.className = "";
    if (theme !== "normal") {
      document.body.classList.add(`${theme}-mode`);
    }
    
    // Persist choice
    localStorage.setItem("smartbank-theme", theme);
  }, [theme]);

  // Expose toggle functions for modes
  const setNormal = () => setTheme("normal");
  const setSenior = () => setTheme("senior");
  const setVisual = () => setTheme("visual");

  return { theme, setTheme, setNormal, setSenior, setVisual };
};

export default useTheme;
