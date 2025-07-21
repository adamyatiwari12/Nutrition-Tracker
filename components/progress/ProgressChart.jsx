'use client';

import { useState } from 'react';
import { useNutrition } from '@/context/NutritionContext';
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function ProgressChart() {
  const { foodLog } = useNutrition();
  const [chartType, setChartType] = useState('bar');
  const [nutrientType, setNutrientType] = useState('calories');
  
  // Create data for each meal type
  console.log('FoodLog in ProgressChart:', foodLog);

  const chartData = [
    {
      name: 'Breakfast',
      calories: foodLog.breakfast.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foodLog.breakfast.reduce((sum, food) => sum + (food.protein || 0), 0),
      carbs: foodLog.breakfast.reduce((sum, food) => sum + (food.carbs || 0), 0),
      fat: foodLog.breakfast.reduce((sum, food) => sum + (food.fat || 0), 0)
    },
    {
      name: 'Lunch',
      calories: foodLog.lunch.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foodLog.lunch.reduce((sum, food) => sum + (food.protein || 0), 0),
      carbs: foodLog.lunch.reduce((sum, food) => sum + (food.carbs || 0), 0),
      fat: foodLog.lunch.reduce((sum, food) => sum + (food.fat || 0), 0)
    },
    {
      name: 'Dinner',
      calories: foodLog.dinner.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foodLog.dinner.reduce((sum, food) => sum + (food.protein || 0), 0),
      carbs: foodLog.dinner.reduce((sum, food) => sum + (food.carbs || 0), 0),
      fat: foodLog.dinner.reduce((sum, food) => sum + (food.fat || 0), 0)
    },
    {
      name: 'Snacks',
      calories: foodLog.snacks.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foodLog.snacks.reduce((sum, food) => sum + (food.protein || 0), 0),
      carbs: foodLog.snacks.reduce((sum, food) => sum + (food.carbs || 0), 0),
      fat: foodLog.snacks.reduce((sum, food) => sum + (food.fat || 0), 0)
    }
  ];

  const renderChart = () => {
    const dataKey = nutrientType;
    const barColor = 
      nutrientType === 'calories' ? '#3b82f6' : 
      nutrientType === 'protein' ? '#ef4444' : 
      nutrientType === 'carbs' ? '#eab308' : 
      '#22c55e';
      
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Nutrition by Meal</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nutrient</label>
          <select
            value={nutrientType}
            onChange={(e) => setNutrientType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="calories">Calories</option>
            <option value="protein">Protein</option>
            <option value="carbs">Carbs</option>
            <option value="fat">Fat</option>
          </select>
        </div>
      </div>
      
      {renderChart()}
    </div>
  );
}