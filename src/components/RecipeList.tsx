//components
import { Link } from "react-router-dom";
// interface
import { IRecipe } from "./dataInterfaces";
//styles
import "./RecipeList.css";

interface RecipeListProps {
  recipes: IRecipe[];
}

const RecipeList = (props: RecipeListProps) => {
  const { recipes } = props;
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div style={{ maxLines: 1 }}>
            {recipe.method.substring(0, 100)}...
          </div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
