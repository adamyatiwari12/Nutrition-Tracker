'use client';

import { useNutrition } from '@/context/NutritionContext';

export default function DailyLog() {
  const { 
    dailyLogs, 
    selectedDate, 
    setSelectedDate, 
    removeFoodFromLog 
  } = useNutrition();

  // Get the current day's log or empty structure if it doesn't exist
  const currentDayLog = dailyLogs[selectedDate] || {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  };

  // Define meal sections with icons/emojis
  const mealSections = [
    { id: 'breakfast', title: '🍳 Breakfast' },
    { id: 'lunch', title: '🥪 Lunch' },
    { id: 'dinner', title: '🍽️ Dinner' },
    { id: 'snacks', title: '🍎 Snacks' }
  ];

  const getMealTotal = (foods) => {
    return foods.reduce((total, food) => {
      return {
        calories: total.calories + (food.calories || 0),
        protein: total.protein + (food.protein || 0),
        carbs: total.carbs + (food.carbs || 0),
        fat: total.fat + (food.fat || 0)
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daily Food Log</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      {mealSections.map((meal) => {
        const foods = currentDayLog[meal.id];
        const totals = getMealTotal(foods);
        
        return (
          <div key={meal.id} className="mb-6">
            <div className="flex justify-between items-center mb-2 pb-1 border-b">
              <h3 className="text-lg font-medium">{meal.title}</h3>
              {foods.length > 0 && (
                <div className="text-sm text-gray-500">
                  {Math.round(totals.calories)} kcal | P: {Math.round(totals.protein)}g | 
                  C: {Math.round(totals.carbs)}g | F: {Math.round(totals.fat)}g
                </div>
              )}
            </div>
            
            {foods.length === 0 ? (
              <p className="text-gray-500 italic text-sm">No foods logged</p>
            ) : (
              <ul className="space-y-2">
                {foods.map((food, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                    <div>
                      <div className="font-medium">{food.name}</div>
                      {food.servingSize && <div className="text-xs text-gray-500">{food.servingSize}</div>}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        {Math.round(food.calories)} kcal
                      </div>
                      <button
                        onClick={() => removeFoodFromLog(meal.id, index)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove food"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}