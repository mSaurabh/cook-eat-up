//components
import { useParams } from "react-router-dom";
import { IRecipe } from "../../components/dataInterfaces";
import { useFetch } from "../../hooks/useFetch";
//styles
import "./Recipe.css";

interface RecipeProps {}

export const Recipe = (props: RecipeProps) => {
  const { id: recipeId } = useParams();
  const url = "http://localhost:3000/recipes/" + recipeId;
  const {
    data: recipe,
    isPending,
    error,
  }: {
    data: IRecipe | undefined;
    isPending: boolean;
    error: string;
  } = useFetch(url);

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <div className="loading">Loading ...</div>}
      {recipe && (
        <>
          {/* @ts-ignore */}
          <h2 className="page-title">{recipe?.title}</h2>
          {/* @ts-ignore */}
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {/* @ts-ignore */}
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          {/* @ts-ignore */}
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
};
