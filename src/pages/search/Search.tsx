import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IRecipe } from "../../components/dataInterfaces";
// components
import RecipeList from "../../components/RecipeList";
import { projectFirestore } from "../../firebase/config";
import { FPATH } from "../../firebase/firestore.props";
// styles
import "./Search.css";

interface SearchProps {}

export const Search = (props: SearchProps) => {
  const queryString = useLocation().search;
  const params = new URLSearchParams(queryString);
  const query = params.get("q");

  const [data, setData] = useState<IRecipe[]>([]);
  const [searchResults, setSearchResults] = useState<IRecipe[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection(FPATH.RECIPES).onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results: IRecipe[] = [];
          snapshot.docs.forEach((doc) => {
            const recData = doc.data() as IRecipe;
            results.push({ ...recData, id: doc.id });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  React.useEffect(() => {
    console.log(data);
    console.log(query);
    if (data && query) {
      setSearchResults(
        data.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()))
      );
    }
  }, [data, query]);

  return (
    <div className="search">
      <h2 className="page-title">{`Recipes including "${query}"`}</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading search results...</p>}
      {searchResults && <RecipeList recipes={searchResults} />}
    </div>
  );
};
