//styles
import { IRecipe } from "../../components/dataInterfaces";
import RecipeList from "../../components/RecipeList";
import { useFetch } from "../../hooks/useFetch";
import "./Home.css";

interface HomeProps {}

export const Home = (props: HomeProps) => {
  const {
    data: recipes,
    isPending,
    error,
  }: {
    data: IRecipe[] | undefined;
    isPending: boolean;
    error: string;
  } = useFetch("http://localhost:3000/recipes");

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};
