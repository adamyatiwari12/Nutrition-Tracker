'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FoodSearch2 from '@/components/tracker/FoodSearch2';
import DailyLog2 from '@/components/tracker/DailyLog2';
import NutritionSummary2 from '@/components/tracker/NutritionSummary2';

export default function TrackerPage() {
  return (
    <>
      <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Nutrition Tracker</h1>
            <p className="mt-2 text-lg text-gray-200">
              Search for foods, track your meals, and monitor your daily nutrition goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            {/* Left Column - Food Search */}
            <div className="lg:col-span-2 text-black">
              <FoodSearch2 />
            </div>

            {/* Right Column - Nutrition Summary */}
            <div className='text-black'>
              <NutritionSummary2 />
            </div>
          </div>

          {/* Daily Log - Full Width */}
          <div className="mt-6 text-black">
            <DailyLog2 />
          </div>
        </main>
      <Footer />
    </>
  );
}