import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRecipe } from "../../components/dataInterfaces";
import { projectFirestore } from "../../firebase/config";
import { FPATH } from "../../firebase/firestore.props";
//styles
import "./Create.css";

interface CreateProps {}

export const Create = (props: CreateProps) => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState("");
  const ingredientInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const recipeSubmission: IRecipe = {
      id: "",
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };
    const recipeRef = projectFirestore.collection(FPATH.RECIPES);
    const newRecipeId = recipeRef.doc().id;
    recipeSubmission.id = newRecipeId;

    try {
      await recipeRef.doc(newRecipeId).set(recipeSubmission, { merge: true });
      alert("Successly created a new recipe...");
      navigate("/");
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current && ingredientInput.current.focus();
  };
  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:
          {ingredients.map((i) => (
            <em key={i} className="current-ing">
              {` ${i}, `}
            </em>
          ))}
        </p>
        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
};
