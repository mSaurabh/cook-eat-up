import React from "react";
import { useLocation } from "react-router-dom";
import { IRecipe } from "../../components/dataInterfaces";
// components
import RecipeList from "../../components/RecipeList";
import { useFetch } from "../../hooks/useFetch";
// styles
import "./Search.css";

interface SearchProps {}

export const Search = (props: SearchProps) => {
  const queryString = useLocation().search;
  const params = new URLSearchParams(queryString);
  const query = params.get("q");
  const url = "http://localhost:3000/recipes?q=" + query;
  const {
    isPending,
    data: searchResults,
    error,
  }: {
    isPending: boolean;
    data: IRecipe[] | undefined;
    error: string;
  } = useFetch(url);

  React.useEffect(() => {
    if (searchResults) {
      console.log(searchResults);
    }
  }, [searchResults]);

  return (
    <div className="search">
      <h2 className="page-title">{`Recipes including "${query}"`}</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading search results...</p>}
      {searchResults && (
        // @ts-ignore
        <RecipeList recipes={searchResults} />
      )}
    </div>
  );
};
