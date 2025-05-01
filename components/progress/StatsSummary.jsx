'use client';

import { useState, useEffect } from 'react';
import { useNutrition } from '@/context/NutritionContext';

export default function StatsSummary() {
  const { getLogsForDateRange, nutritionGoals } = useNutrition();
  const [stats, setStats] = useState({
    averageCalories: 0,
    averageProtein: 0,
    averageCarbs: 0,
    averageFat: 0,
    daysOnTarget: 0,
    totalDays: 0,
    bestDay: null,
    worstDay: null
  });

  useEffect(() => {
    // Get data for the last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    // Format dates
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    // Get data from context
    const data = getLogsForDateRange(formatDate(startDate), formatDate(endDate));
    
    if (data.length === 0) {
      return;
    }
    
    // Calculate statistics
    const totalDays = data.length;
    const nonZeroDays = data.filter(day => day.calories > 0).length;
    
    // Calculate totals
    const totals = data.reduce(
      (acc, day) => ({
        calories: acc.calories + day.calories,
        protein: acc.protein + day.protein,
        carbs: acc.carbs + day.carbs,
        fat: acc.fat + day.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    
    // Calculate averages (only for days with data)
    const averages = {
      calories: nonZeroDays ? totals.calories / nonZeroDays : 0,
      protein: nonZeroDays ? totals.protein / nonZeroDays : 0,
      carbs: nonZeroDays ? totals.carbs / nonZeroDays : 0,
      fat: nonZeroDays ? totals.fat / nonZeroDays : 0
    };
    
    // Calculate days on target (within 10% of goal)
    const daysOnTarget = data.filter(day => {
      if (day.calories === 0) return false;
      const lowerBound = nutritionGoals.calories * 0.9;
      const upperBound = nutritionGoals.calories * 1.1;
      return day.calories >= lowerBound && day.calories <= upperBound;
    }).length;
    
    // Find best day (closest to target)
    let bestDay = null;
    let bestDayDifference = Infinity;
    
    // Find worst day (furthest from target, but only counting days with data)
    let worstDay = null;
    let worstDayDifference = -Infinity;
    
    data.forEach(day => {
      if (day.calories === 0) return;
      
      const difference = Math.abs(day.calories - nutritionGoals.calories);
      
      if (difference < bestDayDifference) {
        bestDayDifference = difference;
        bestDay = day;
      }
      
      if (difference > worstDayDifference) {
        worstDayDifference = difference;
        worstDay = day;
      }
    });
    
    setStats({
      averageCalories: Math.round(averages.calories),
      averageProtein: Math.round(averages.protein),
      averageCarbs: Math.round(averages.carbs),
      averageFat: Math.round(averages.fat),
      daysOnTarget,
      totalDays: nonZeroDays,
      bestDay,
      worstDay
    });
  }, [getLogsForDateRange, nutritionGoals.calories]);

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Nutrition Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Last 30 Days Averages</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Average Calories:</span>
              <span className="font-medium">{stats.averageCalories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Protein:</span>
              <span className="font-medium">{stats.averageProtein} g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Carbs:</span>
              <span className="font-medium">{stats.averageCarbs} g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Fat:</span>
              <span className="font-medium">{stats.averageFat} g</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Adherence</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Days Logged:</span>
              <span className="font-medium">{stats.totalDays} of 30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Days On Target:</span>
              <span className="font-medium">{stats.daysOnTarget} ({stats.totalDays > 0 ? Math.round((stats.daysOnTarget / stats.totalDays) * 100) : 0}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Best Day:</span>
              <span className="font-medium">
                {stats.bestDay ? `${formatDisplayDate(stats.bestDay.date)} (${Math.round(stats.bestDay.calories)} kcal)` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Furthest from Target:</span>
              <span className="font-medium">
                {stats.worstDay ? `${formatDisplayDate(stats.worstDay.date)} (${Math.round(stats.worstDay.calories)} kcal)` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}