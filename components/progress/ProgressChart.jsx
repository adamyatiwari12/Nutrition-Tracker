'use client';

import { useState, useEffect } from 'react';
import { useNutrition } from '@/context/NutritionContext';
import { 
  LineChart, 
  Line, 
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
  const { getLogsForDateRange } = useNutrition();
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState('week');
  const [chartType, setChartType] = useState('line');
  const [nutrientType, setNutrientType] = useState('calories');
  
  useEffect(() => {
    // Get start date based on selected range
    const endDate = new Date();
    let startDate = new Date();
    
    if (dateRange === 'week') {
      startDate.setDate(endDate.getDate() - 7);
    } else if (dateRange === 'month') {
      startDate.setMonth(endDate.getMonth() - 1);
    } else if (dateRange === '3months') {
      startDate.setMonth(endDate.getMonth() - 3);
    }
    
    // Format dates for API call
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    // Get data from context
    const data = getLogsForDateRange(formatDate(startDate), formatDate(endDate));
    
    // Format data for chart - ensure dates display nicely
    const formattedData = data.map(day => ({
      ...day,
      date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
    
    setChartData(formattedData);
  }, [dateRange, getLogsForDateRange]);

  const renderChart = () => {
    if (chartData.length === 0) {
      return <div className="text-center py-10 text-gray-500">No data available for the selected period</div>;
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={nutrientType}
              stroke={
                nutrientType === 'calories' ? '#3b82f6' : 
                nutrientType === 'protein' ? '#ef4444' : 
                nutrientType === 'carbs' ? '#eab308' : 
                '#22c55e'
              }
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={nutrientType}
              fill={
                nutrientType === 'calories' ? '#3b82f6' : 
                nutrientType === 'protein' ? '#ef4444' : 
                nutrientType === 'carbs' ? '#eab308' : 
                '#22c55e'
              }
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Progress Chart</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last Month</option>
            <option value="3months">Last 3 Months</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
        
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