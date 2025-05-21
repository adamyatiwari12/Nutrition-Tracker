'use client';

import { useNutrition } from '@/context/NutritionContext';

export default function NutritionSummary() {
  const { calculateTotals } = useNutrition();
  
  const totals = calculateTotals();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Nutrition Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
          <span className="font-medium">Calories</span>
          <span className="text-lg font-bold">{Math.round(totals.calories)} kcal</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-green-50 rounded-md">
            <div className="text-sm text-gray-600">Protein</div>
            <div className="font-bold">{Math.round(totals.protein)}g</div>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-md">
            <div className="text-sm text-gray-600">Carbs</div>
            <div className="font-bold">{Math.round(totals.carbs)}g</div>
          </div>
          
          <div className="p-3 bg-red-50 rounded-md">
            <div className="text-sm text-gray-600">Fat</div>
            <div className="font-bold">{Math.round(totals.fat)}g</div>
          </div>
        </div>
      </div>
      
      {totals.calories > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Macronutrient Breakdown</h3>
          <div className="flex h-8 rounded-lg overflow-hidden">
            {/* Protein */}
            <div
              className="bg-green-500"
              style={{ 
                width: `${totals.calories > 0 ? (totals.protein * 4 / totals.calories) * 100 : 0}%` 
              }}
              title={`Protein: ${Math.round((totals.protein * 4 / totals.calories) * 100)}%`}
            ></div>
            
            {/* Carbs */}
            <div
              className="bg-yellow-500"
              style={{ 
                width: `${totals.calories > 0 ? (totals.carbs * 4 / totals.calories) * 100 : 0}%` 
              }}
              title={`Carbs: ${Math.round((totals.carbs * 4 / totals.calories) * 100)}%`}
            ></div>
            
            {/* Fat */}
            <div
              className="bg-red-500"
              style={{ 
                width: `${totals.calories > 0 ? (totals.fat * 9 / totals.calories) * 100 : 0}%` 
              }}
              title={`Fat: ${Math.round((totals.fat * 9 / totals.calories) * 100)}%`}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Protein</span>
            <span>Carbs</span>
            <span>Fat</span>
          </div>
        </div>
      )}
    </div>
  );
}