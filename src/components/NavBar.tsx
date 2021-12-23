import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
// styles
import "./NavBar.css";
import SearchBar from "./SearchBar";

interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: `${color}` }}>
      <nav>
        <Link to="/" className="brand">
          <h1>🥤 Cook Eat Up 🍕</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
};
