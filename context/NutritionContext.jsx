'use client';

import { createContext, useContext, useState } from 'react';

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

  // Remove localStorage usage - just use React state
  const addFoodToLog = (food, mealType) => {
    console.log('Adding food to log:', food, 'to meal:', mealType);
    setFoodLog(prevLog => {
      const newLog = {
        ...prevLog,
        [mealType]: [...prevLog[mealType], food]
      };
      console.log('New foodLog after adding:', newLog);
      return newLog;
    });
  };

  const removeFoodFromLog = (mealType, foodIndex) => {
    console.log('Removing food from:', mealType, 'at index:', foodIndex);
    setFoodLog(prevLog => {
      const updatedMeal = [...prevLog[mealType]];
      updatedMeal.splice(foodIndex, 1);
      
      const newLog = {
        ...prevLog,
        [mealType]: updatedMeal
      };
      console.log('New foodLog after removing:', newLog);
      return newLog;
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