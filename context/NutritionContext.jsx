'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Simplified Nutrition Context
const NutritionContext = createContext();

export function NutritionProvider({ children }) {
  const [foodLog, setFoodLog] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved data on initial load
  useEffect(() => {
    const savedLog = localStorage.getItem('foodLog');
    
    if (savedLog) {
      setFoodLog(JSON.parse(savedLog));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('foodLog', JSON.stringify(foodLog));
  }, [foodLog]);

  const addFoodToLog = (food, mealType) => {
    setFoodLog(prevLog => ({
      ...prevLog,
      [mealType]: [...prevLog[mealType], food]
    }));
  };

  const removeFoodFromLog = (mealType, foodIndex) => {
    setFoodLog(prevLog => {
      const updatedMeal = [...prevLog[mealType]];
      updatedMeal.splice(foodIndex, 1);
      
      return {
        ...prevLog,
        [mealType]: updatedMeal
      };
    });
  };

  const calculateTotals = () => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];
    
    return mealTypes.reduce((totals, meal) => {
      return foodLog[meal].reduce((mealTotal, food) => {
        return {
          calories: mealTotal.calories + (food.calories || 0),
          protein: mealTotal.protein + (food.protein || 0),
          carbs: mealTotal.carbs + (food.carbs || 0),
          fat: mealTotal.fat + (food.fat || 0)
        };
      }, totals);
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const value = {
    foodLog,
    isLoading,
    error,
    addFoodToLog,
    removeFoodFromLog,
    calculateTotals
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
}

export function useNutrition() {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
}