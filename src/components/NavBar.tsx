import { Link } from "react-router-dom";
// styles
import "./NavBar.css";
import SearchBar from "./SearchBar";

interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
};
