"use client";
 
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "@/components/Icons";

const RecipeSearchBar = ({
  handleSearchFocus,
  handleBlur,
  showResults,
  setShowResults,
}) => {
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
    <div
      id="searchBar"
      className="flex flex-col relative p-2 rounded-xl backdrop-blur-md bg-gradient-to-r from-purple-900/60 to-purple-950/60 border border-purple-700 shadow-xl"
    >
      {!isSearchOpen ? (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 text-white hover:text-purple-300 transition duration-300 ease-in-out px-4 py-2 rounded-xl bg-purple-800/60 hover:bg-purple-700/60 shadow-md"
        >
          <SearchIcon className="w-5 h-5 animate-pulse" />
          <span className="text-base font-medium">Search dish</span>
        </button>
      ) : (
        <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-900 border border-purple-700 text-white rounded-xl w-80 shadow-lg transition duration-300 ease-in-out">
          <SearchIcon className="animate-bounce" />
          <input
            ref={inputRef}
            type="text"
            className="grow bg-transparent text-white placeholder-purple-300 outline-none"
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
          <button
            onClick={() => {
              handleSearch("");
              setIsSearchOpen(false);
            }}
          >
            <X className="text-white hover:text-red-300 transition duration-200" />
          </button>
        </label>
      )}

      {showResults && input && isSearchOpen && (
        <div
          ref={resultsRef}
          className="w-80 max-h-80 overflow-y-scroll no-scrollbar bg-gradient-to-b from-purple-800 to-purple-950 border border-purple-700 p-2 rounded-xl flex flex-col gap-2 absolute top-14 md:top-20 md:right-0 z-10 shadow-lg animate-fade-in"
        >
          {meals &&
            meals.map((meal, index) => (
              <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`}>
                <div
                  className={`$ {
                    index === activeIndex
                      ? "bg-purple-700"
                      : "hover:bg-purple-800"
                  } p-2 rounded-xl flex items-center justify-start gap-3 text-white transition-colors duration-200 cursor-pointer backdrop-blur-sm bg-opacity-60`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    window.location.href = `/meal/${meal.idMeal}`;
                  }}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-10 h-10 rounded-full border-2 border-purple-300 shadow-md"
                  />
                  <span className="font-semibold text-sm">{meal.strMeal}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default RecipeSearchBar;
