'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { searchFoods, getFoodDetails } from '@/lib/api';

const NutritionContext = createContext();

export function NutritionProvider({ children }) {
  // User's daily logs
  const [dailyLogs, setDailyLogs] = useState({});
  
  // Current date for logging
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // User's nutritional goals
  const [nutritionGoals, setNutritionGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65
  });
  
  // Search state
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedLogs = localStorage.getItem('dailyLogs');
    const savedGoals = localStorage.getItem('nutritionGoals');
    
    if (savedLogs) {
      setDailyLogs(JSON.parse(savedLogs));
    }
    
    if (savedGoals) {
      setNutritionGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  useEffect(() => {
    localStorage.setItem('nutritionGoals', JSON.stringify(nutritionGoals));
  }, [nutritionGoals]);

  // Search for foods using API
  const searchFood = async (query) => {
    if (!query) return;
    
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

  // Add food to daily log
  const addFoodToLog = async (food, mealType) => {
    // If we only have basic info, get detailed nutrition data
    let foodDetails = food;
    
    if (!food.nutrients) {
      setIsLoading(true);
      try {
        foodDetails = await getFoodDetails(food.fdcId);
      } catch (err) {
        setError('Failed to get food details. Please try again.');
        console.error(err);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
    
    // Add to the appropriate day and meal
    setDailyLogs(prevLogs => {
      // Create new day if it doesn't exist
      const dayLog = prevLogs[selectedDate] || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      };
      
      // Add food to the specified meal
      return {
        ...prevLogs,
        [selectedDate]: {
          ...dayLog,
          [mealType]: [...dayLog[mealType], foodDetails]
        }
      };
    });
  };

  // Remove food from daily log
  const removeFoodFromLog = (mealType, foodIndex) => {
    setDailyLogs(prevLogs => {
      const dayLog = prevLogs[selectedDate];
      if (!dayLog) return prevLogs;
      
      const updatedMeal = [...dayLog[mealType]];
      updatedMeal.splice(foodIndex, 1);
      
      return {
        ...prevLogs,
        [selectedDate]: {
          ...dayLog,
          [mealType]: updatedMeal
        }
      };
    });
  };

  // Update nutrition goals
  const updateNutritionGoals = (newGoals) => {
    setNutritionGoals(prevGoals => ({
      ...prevGoals,
      ...newGoals
    }));
  };

  // Calculate daily totals
  const calculateDailyTotals = (date) => {
    const dayLog = dailyLogs[date || selectedDate];
    if (!dayLog) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];
    
    return mealTypes.reduce((totals, meal) => {
      return dayLog[meal].reduce((mealTotal, food) => {
        return {
          calories: mealTotal.calories + (food.calories || 0),
          protein: mealTotal.protein + (food.protein || 0),
          carbs: mealTotal.carbs + (food.carbs || 0),
          fat: mealTotal.fat + (food.fat || 0)
        };
      }, totals);
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  // Get logs for a date range
  const getLogsForDateRange = (startDate, endDate) => {
    const logs = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Create array of dates in range
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      logs.push({
        date: dateString,
        ...calculateDailyTotals(dateString)
      });
    }
    
    return logs;
  };

  const value = {
    dailyLogs,
    selectedDate,
    setSelectedDate,
    nutritionGoals,
    searchResults,
    isLoading,
    error,
    searchFood,
    addFoodToLog,
    removeFoodFromLog,
    updateNutritionGoals,
    calculateDailyTotals,
    getLogsForDateRange
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