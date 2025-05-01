'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FoodSearch from '@/components/tracker/FoodSearch';
import DailyLog from '@/components/tracker/DailyLog';
import NutritionSummary from '@/components/tracker/NutritionSummary';
import { NutritionProvider } from '@/context/NutritionContext';

export default function TrackerPage() {
  return (
    <>
      <Navbar />
      <NutritionProvider>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Nutrition Tracker</h1>
            <p className="mt-2 text-lg text-gray-600">
              Search for foods, track your meals, and monitor your daily nutrition goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Food Search */}
            <div className="lg:col-span-2">
              <FoodSearch />
            </div>

            {/* Right Column - Nutrition Summary */}
            <div>
              <NutritionSummary />
            </div>
          </div>

          {/* Daily Log - Full Width */}
          <div className="mt-6">
            <DailyLog />
          </div>
        </main>
      </NutritionProvider>
      <Footer />
    </>
  );
}