//components
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IRecipe } from "../../components/dataInterfaces";
import { projectFirestore } from "../../firebase/config";
import { FPATH } from "../../firebase/firestore.props";
import { useTheme } from "../../hooks/useTheme";
//styles
import "./Recipe.css";

interface RecipeProps {}

export const Recipe = (props: RecipeProps) => {
  const { id: recipeId } = useParams();
  const { mode } = useTheme();
  const [recipe, setRecipe] = useState<IRecipe>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>("");

  React.useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection(FPATH.RECIPES)
      .doc(recipeId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const recipe = snapshot.data() as IRecipe;
          setRecipe({ ...recipe, id: snapshot.id });
          setError("");
        } else {
          setError("Could not find that recipe...");
        }
      })
      .catch((err) => {
        setError(err.message);
      });

    setIsPending(false);
  }, [recipeId]);
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <div className="loading">Loading ...</div>}
      {recipe && !error && (
        <>
          <h2 className="recipe-page-title">{recipe?.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
};
