// styles
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

interface SearchBarProps {}

export const SearchBar = (props: SearchBarProps) => {
  const [term, setTerm] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${term}`);
    // ?q=term
  };
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
};

export default SearchBar;
