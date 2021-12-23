//components
import { Link } from "react-router-dom";
import TrashCan from "../assets/trashcan.svg";
import { projectFirestore } from "../firebase/config";
import { FPATH } from "../firebase/firestore.props";
import { useTheme } from "../hooks/useTheme";
// interface
import { IRecipe } from "./dataInterfaces";
//styles
import "./RecipeList.css";

interface RecipeListProps {
  recipes: IRecipe[];
}

const RecipeList = (props: RecipeListProps) => {
  const { recipes } = props;
  const { mode } = useTheme();
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }
  const handleClick = (recipeId: string) => {
    projectFirestore.collection(FPATH.RECIPES).doc(recipeId).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div style={{ maxLines: 1 }}>
            {recipe.method.substring(0, 100)}...
          </div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            alt="Delete this recipe"
            src={TrashCan}
            className="delete"
            onClick={() => {
              handleClick(recipe.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
