import { useState, useEffect } from "react";
import "./darkMode.scss";
import Cookies from "universal-cookie";
import darkIcon from "/assets/img/dark-mode.png";
import lightIcon from "/assets/img/light-mode.png";

const DarkMode = () => {
  const cookies=new Cookies()
  const [darkMode, setDarkMode] = useState(cookies.get("darkMode") === "true");
  
  const changeColor = (property, color) => {
    document.documentElement.style.setProperty(property, color);
  };

  useEffect(() => {
    const colors = {
      "--bg-color": darkMode ? "#3d3d3d" : "#f2f2f2",
      "--white-color": darkMode ? "#3d3d3d" : "#ffffff",
      "--dark-color": darkMode ? "#f2f2f2" : "#3d3d3d",
      "--light-color": darkMode ? "#3d3d3d" : "#f2f2f2",
      "--slate-gray-matte": darkMode ? "#c0c0c0" : "#3d3d3d",
      "--silver-matte": darkMode ? "#444444" : "#c0c0c0",
      "--storm-gray-matte": darkMode ? "#f2f2f2" : "#444444",
    };

    Object.entries(colors).forEach(([key, value]) => {
      changeColor(key, value);
    });
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    cookies.set("darkMode", !darkMode);
  };

  return (
    <button className="dark-mode" type="button" onClick={handleDarkMode}>
      <img src={darkMode ? lightIcon : darkIcon} alt={darkMode ? "Light Mode" : "Dark Mode"} />
    </button>
  );
};

export default DarkMode;
