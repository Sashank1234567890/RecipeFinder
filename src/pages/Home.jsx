import React, { useEffect, useRef, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import Spinner from "./spinner";
import ErrorPage from "./Error";

// const dummyRecipes = [
//   {
//     id: 1,
//     name: "Margherita Pizza",
//     image: "/images/recipe-1.svg",
//     cuisine: "Italian",
//     difficulty: "Easy",
//     rating: 4.8,
//     prepTimeMinutes: 20,
//     cookTimeMinutes: 15,
//   },
//   {
//     id: 2,
//     name: "Vegetable Stir-Fry",
//     image: "/images/recipe-2.svg",
//     cuisine: "Asian",
//     difficulty: "Easy",
//     rating: 4.6,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 10,
//   },
//   {
//     id: 3,
//     name: "Chocolate Chip Cookies",
//     image: "/images/recipe-3.svg",
//     cuisine: "American",
//     difficulty: "Medium",
//     rating: 4.9,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 12,
//   },
//   {
//     id: 4,
//     name: "Chicken Alfredo Pasta",
//     image: "/images/recipe-4.svg",
//     cuisine: "Italian",
//     difficulty: "Medium",
//     rating: 4.7,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 20,
//   },
//   {
//     id: 5,
//     name: "Mango Lassi",
//     image: "/images/recipe-5.svg",
//     cuisine: "Indian",
//     difficulty: "Easy",
//     rating: 4.9,
//     prepTimeMinutes: 10,
//     cookTimeMinutes: 0,
//   },
//   {
//     id: 6,
//     name: "Caprese Salad",
//     image: "/images/recipe-6.svg",
//     cuisine: "Italian",
//     difficulty: "Easy",
//     rating: 4.5,
//     prepTimeMinutes: 10,
//     cookTimeMinutes: 0,
//   },
// ];

function Home() {
  // let skipCount = useRef(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // const [skipCount, setSkipCount] = useState(0);
  const [total, setTotal] = useState(0);

  async function fetchRecipes(skipCount, query) {
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      console.log(query);

      if (query)
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
      let { data } = await axios(url);
      // console.log(data);
      // if (
      //   data.recipes.every((item) =>
      //     recipes.some((recipe) => recipe.id === item.id),
      //   )
      // ) {
      //   return;
      // }

      setRecipes(
        skipCount === 0 ? data.recipes : (prev) => [...prev, ...data.recipes],
      );

      setLoading(false);
      setTotal(data.total);

      return data;
    } catch (e) {
      // console.log(e);
      setLoading(true);
    }
  }
  useEffect(() => {
    fetchRecipes(0);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    let q = form.get("query").trim();
    if (!q) return;

    setQuery(q);
    setLoading(true);

    fetchRecipes(0, q);
  }

  
  if (loading) {
    return (
      <>
        <Spinner size="h-16 w-16" color="text-red-500" />
      </>
    );
  }
  if (recipes.length === 0) {
    return <ErrorPage error="Recipe not found"></ErrorPage>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form
        className="flex gap-2 max-w-md mx-auto mb-8"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search recipes..."
          name="query"
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>
      
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length < total && (
        <div className="text-center mt-8">
          <button
            type="button"
            className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
            onClick={() => {
              // skipCount.current += 6;
              // fetchRecipes(skipCount.current);
              fetchRecipes(recipes.length, query);
            }}
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;
