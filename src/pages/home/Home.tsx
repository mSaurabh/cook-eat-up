//styles
import { useEffect, useState } from "react";
import { IRecipe } from "../../components/dataInterfaces";
import RecipeList from "../../components/RecipeList";
import { projectFirestore } from "../../firebase/config";
import { FPATH } from "../../firebase/firestore.props";
import "./Home.css";

interface HomeProps {}

export const Home = (props: HomeProps) => {
  const [data, setData] = useState<IRecipe[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection(FPATH.RECIPES)
      .get()
      .then((snapshot) => {
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
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};
