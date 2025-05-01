'use client';

import { useNutrition } from '@/context/NutritionContext';

export default function NutritionSummary() {
  const { calculateDailyTotals, nutritionGoals } = useNutrition();
  
  const totals = calculateDailyTotals();
  
  // Calculate percentages of goals
  const calculatePercentage = (value, goal) => {
    if (!goal) return 0;
    const percentage = (value / goal) * 100;
    return Math.min(percentage, 100); // Cap at 100% for the progress bar
  };
  
  const caloriesPercentage = calculatePercentage(totals.calories, nutritionGoals.calories);
  const proteinPercentage = calculatePercentage(totals.protein, nutritionGoals.protein);
  const carbsPercentage = calculatePercentage(totals.carbs, nutritionGoals.carbs);
  const fatPercentage = calculatePercentage(totals.fat, nutritionGoals.fat);
  
  // Define nutrition items
  const nutritionItems = [
    {
      name: 'Calories',
      current: Math.round(totals.calories),
      goal: nutritionGoals.calories,
      unit: 'kcal',
      percentage: caloriesPercentage,
      color: 'bg-blue-500'
    },
    {
      name: 'Protein',
      current: Math.round(totals.protein),
      goal: nutritionGoals.protein,
      unit: 'g',
      percentage: proteinPercentage,
      color: 'bg-red-500'
    },
    {
      name: 'Carbs',
      current: Math.round(totals.carbs),
      goal: nutritionGoals.carbs,
      unit: 'g',
      percentage: carbsPercentage,
      color: 'bg-yellow-500'
    },
    {
      name: 'Fat',
      current: Math.round(totals.fat),
      goal: nutritionGoals.fat,
      unit: 'g',
      percentage: fatPercentage,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Nutrition Summary</h2>
      
      <div className="space-y-6">
        {nutritionItems.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <span>
                {item.current} / {item.goal} {item.unit} ({Math.round(item.percentage)}%)
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Macronutrient Breakdown</h3>
        <div className="flex h-8 rounded-lg overflow-hidden">
          {nutritionItems.slice(1).map((item) => {
            // Skip calories, only show macros
            const macroPercentage = totals.calories > 0
              ? (item.current * (item.name === 'Protein' ? 4 : item.name === 'Carbs' ? 4 : 9) / totals.calories) * 100
              : 0;
              
            return (
              <div
                key={item.name}
                className={`${item.color}`}
                style={{ width: `${macroPercentage}%` }}
                title={`${item.name}: ${Math.round(macroPercentage)}%`}
              ></div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Protein</span>
          <span>Carbs</span>
          <span>Fat</span>
        </div>
      </div>
    </div>
  );
}