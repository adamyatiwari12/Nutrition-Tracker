'use client';

import { useNutrition } from '@/context/NutritionContext';

export default function StatsSummary() {
  const { foodLog, calculateTotals } = useNutrition();
  
  // Calculate totals from all meals
  const totals = calculateTotals();
  
  // Calculate totals for each meal type
  const mealTotals = {
    breakfast: {
      calories: foodLog.breakfast.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foodLog.breakfast.reduce((sum, food) => sum + (food.protein || 0), 0),
      carbs: foodLog.breakfast.reduce((sum, food) => sum + (food.carbs || 0), 0),
      fat: foodLog.breakfast.reduce((sum, food) => sum + (food.fat || 0), 0)
    },
    lunch: {
      calories: foodLog.lunch.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foodLog.lunch.reduce((sum, food) => sum + (food.protein || 0), 0),
      carbs: foodLog.lunch.reduce((sum, food) => sum + (food.carbs || 0), 0),
      fat: foodLog.lunch.reduce((sum, food) => sum + (food.fat || 0), 0)
    },
    dinner: {
      calories: foodLog.dinner.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foodLog.dinner.reduce((sum, food) => sum + (food.protein || 0), 0),
      carbs: foodLog.dinner.reduce((sum, food) => sum + (food.carbs || 0), 0),
      fat: foodLog.dinner.reduce((sum, food) => sum + (food.fat || 0), 0)
    },
    snacks: {
      calories: foodLog.snacks.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foodLog.snacks.reduce((sum, food) => sum + (food.protein || 0), 0),
      carbs: foodLog.snacks.reduce((sum, food) => sum + (food.carbs || 0), 0),
      fat: foodLog.snacks.reduce((sum, food) => sum + (food.fat || 0), 0)
    }
  };
  
  // Count total food items
  const totalItems = Object.values(foodLog).reduce(
    (sum, mealItems) => sum + mealItems.length, 
    0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Nutrition Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Today's Totals</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Calories:</span>
              <span className="font-medium">{Math.round(totals.calories)} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Protein:</span>
              <span className="font-medium">{Math.round(totals.protein)} g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Carbs:</span>
              <span className="font-medium">{Math.round(totals.carbs)} g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Fat:</span>
              <span className="font-medium">{Math.round(totals.fat)} g</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Meal Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Breakfast:</span>
              <span className="font-medium">{Math.round(mealTotals.breakfast.calories)} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lunch:</span>
              <span className="font-medium">{Math.round(mealTotals.lunch.calories)} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dinner:</span>
              <span className="font-medium">{Math.round(mealTotals.dinner.calories)} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Snacks:</span>
              <span className="font-medium">{Math.round(mealTotals.snacks.calories)} kcal</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Macronutrient Distribution</h3>
        <div className="flex gap-4 justify-between">
          <div className="text-center">
            <div className="text-lg font-bold text-red-500">{Math.round(totals.protein)}g</div>
            <div className="text-sm text-gray-600">Protein</div>
            <div className="text-xs text-gray-500">
              {totals.calories > 0 ? Math.round((totals.protein * 4 / totals.calories) * 100) : 0}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-500">{Math.round(totals.carbs)}g</div>
            <div className="text-sm text-gray-600">Carbs</div>
            <div className="text-xs text-gray-500">
              {totals.calories > 0 ? Math.round((totals.carbs * 4 / totals.calories) * 100) : 0}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">{Math.round(totals.fat)}g</div>
            <div className="text-sm text-gray-600">Fat</div>
            <div className="text-xs text-gray-500">
              {totals.calories > 0 ? Math.round((totals.fat * 9 / totals.calories) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}