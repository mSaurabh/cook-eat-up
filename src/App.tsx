import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//styles
import "./App.css";
import { NavBar } from "./components/NavBar";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";
import { Create } from "./pages/create/Create";
import { Home } from "./pages/home/Home";
import { Recipe } from "./pages/recipe/Recipe";
import { Search } from "./pages/search/Search";

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <NavBar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
