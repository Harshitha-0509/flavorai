// RecipeSearchBar.js
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "@/components/Icons";

const RecipeSearchBar = ({ handleSearchFocus, handleBlur, showResults, setShowResults }) => {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (input) {
      fetchMeals(input);
    } else {
      setMeals([]);
    }
  }, [input]);

  const fetchMeals = (value) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals));
  };

  const handleSearch = (value) => {
    setInput(value);
    if (!value) {
      setMeals([]);
      return;
    }
    fetchMeals(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prev) => {
        const newIndex = prev < meals.length - 1 ? prev + 1 : prev;
        scrollIntoView(newIndex);
        return newIndex;
      });
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : prev;
        scrollIntoView(newIndex);
        return newIndex;
      });
    } else if (event.key === "Enter" && activeIndex >= 0) {
      window.location.href = `/meal/${meals[activeIndex].idMeal}`;
    } else if (event.key === "Escape") {
      setShowResults(false);
      setIsSearchOpen(false);
      inputRef.current.blur();
    }
  };

  const scrollIntoView = (index) => {
    if (resultsRef.current) {
      const resultItems = resultsRef.current.children;
      if (resultItems[index]) {
        resultItems[index].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [meals, activeIndex]);

  const handleClickOutside = (e) => {
    if (!e.target.closest('#searchBar')) {
      setIsSearchOpen(false);
      handleBlur();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id="searchBar" className="relative w-full max-w-md mx-auto mt-4">
      {!isSearchOpen ? (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          <SearchIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Search dish</span>
        </button>
      ) : (
        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg w-full shadow">
          <SearchIcon className="text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            className="grow bg-transparent text-gray-700 placeholder-gray-400 outline-none"
            placeholder="Search dish..."
            value={input}
            onChange={(e) => {
              handleSearch(e.target.value);
              setShowResults(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleSearchFocus}
            autoFocus
          />
          <button onClick={() => {
            handleSearch("");
            setIsSearchOpen(false);
          }}>
            <X className="text-gray-400 hover:text-red-400 transition" />
          </button>
        </label>
      )}

      {showResults && input && isSearchOpen && (
        <div
          ref={resultsRef}
          className="absolute z-10 mt-2 w-full max-h-80 overflow-y-scroll bg-white border border-gray-300 rounded-lg shadow-md animate-fade-in"
        >
          {meals && meals.map((meal, index) => (
            <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`}>
              <div
                className={`$ {
                  index === activeIndex
                    ? "bg-purple-100"
                    : "hover:bg-gray-100"
                } p-2 rounded-lg flex items-center gap-3 cursor-pointer`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  window.location.href = `/meal/${meal.idMeal}`;
                }}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-10 h-10 rounded-full border"
                />
                <span className="text-sm font-semibold text-gray-800">{meal.strMeal}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeSearchBar;
