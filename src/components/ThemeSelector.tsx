// components
import modeIcon from "../assets/mode-icon.svg";
import { useTheme } from "../hooks/useTheme";
// styles
import "./ThemeSelector.css";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

interface ThemeSelectorProps {}

export const ThemeSelector = (props: ThemeSelectorProps) => {
  const { changeColor, mode, changeMode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "light" ? "dark" : "light");
    // console.log(mode);
  };
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          onClick={toggleMode}
          src={modeIcon}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
          alt="Switch light/dark modes"
        />
      </div>
      <div className="theme-buttons">
        {themeColors &&
          themeColors.map((tcolor) => (
            <div
              key={tcolor}
              onClick={() => changeColor(tcolor)}
              style={{ background: tcolor }}
            />
          ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
