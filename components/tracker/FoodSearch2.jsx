"use client";

import { useState } from "react";
import { searchFoods } from "@/lib/api2";
import { useNutrition } from "@/context/NutritionContext"; 


export default function FoodSearch2() {
  const [query, setQuery] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addFoodToLog } = useNutrition();

  const mealTypes = [
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
    { id: "snacks", label: "Snacks" },
  ];

  const handleSearch = async (e) => {
    if (!query) {
      setError("Please enter a search term.");
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchFoods(query);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search for foods. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Search Foods</h2>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a food (e.g. '1 apple' or 'chicken breast')"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add to meal:
        </label>
        <div className="flex flex-wrap gap-2">
          {mealTypes.map((meal) => (
            <button
              key={meal.id}
              type="button"
              onClick={() => setSelectedMeal(meal.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedMeal === meal.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {meal.label}
            </button>
          ))}
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          <div className="max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Food
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Macros (g)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((food, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {food.name}
                      </div>
                      {food.servingSize && (
                        <div className="text-xs text-gray-500">
                          {food.servingSize}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {food.calories ? Math.round(food.calories) : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-500">
                        P: {food.protein ? Math.round(food.protein) : "N/A"} |
                        C: {food.carbs ? Math.round(food.carbs) : "N/A"} | F:{" "}
                        {food.fat ? Math.round(food.fat) : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => addFoodToLog(food, selectedMeal)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Add to {selectedMeal}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}