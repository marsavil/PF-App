import { useState, useEffect } from "react";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const bgColor = darkMode ? "#3d3d3d" : "#f2f2f2";
    const darkColor = darkMode ? "#f2f2f2" : "#3d3d3d";
    const lightColor = darkMode ? "#3d3d3d" : "#f2f2f2";
    const slateGrayMatte = darkMode ? "#c0c0c0" : "#444444";
    const silverMatte = darkMode ? "#444444" : "#c0c0c0";
    const stormGrayMatte = darkMode ? "#f2f2f2" : "#5d5d5d";

    document.documentElement.style.setProperty("--bg-color", bgColor);
    document.documentElement.style.setProperty("--dark-color", darkColor);
    document.documentElement.style.setProperty("--light-color", lightColor);
    document.documentElement.style.setProperty("--slate-gray-matte", slateGrayMatte);
    document.documentElement.style.setProperty("--silver-matte", silverMatte);
    document.documentElement.style.setProperty("--storm-gray-matte", stormGrayMatte);
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="dark-mode">
      <button type="button" onClick={handleDarkMode}>
        {!darkMode ? "Dark" : "Light"}
      </button>
    </div>
  );
};

export default DarkMode;
