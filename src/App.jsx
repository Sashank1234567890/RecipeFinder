import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";
import { Routes } from "react-router";
import { Route } from "react-router";
import RecipeCard from "./components/RecipeCard";

function App() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="recipe/:id" element={<RecipeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
