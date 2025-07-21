'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProgressChart from '@/components/progress/ProgressChart';
import StatsSummary from '@/components/progress/StatsSummary';
import { Calendar, TrendingUp, BarChart2, Award } from 'lucide-react';

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
      <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">Your Progress</h1>
        <div className="flex items-center space-x-2">
          <button 
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <TrendingUp size={18} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              activeTab === 'detailed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('detailed')}
          >
            <BarChart2 size={18} />
            <span>Detailed View</span>
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-8 text-black">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SummaryCard 
              title="Streak" 
              value="7 days"
              icon={<Calendar className="text-blue-500" />}
              description="Current logging streak"
            />
            <SummaryCard 
              title="Accuracy" 
              value="89%"
              icon={<Award className="text-green-500" />}
              description="Adherence to goals"
            />
            <SummaryCard 
              title="Progress" 
              value="+2.1 lbs"
              icon={<TrendingUp className="text-purple-500" />}
              description="Weight change (30d)"
            />
            <SummaryCard 
              title="Days Logged" 
              value="28/30"
              icon={<Calendar className="text-orange-500" />}
              description="Last 30 days"
            />
          </div>

          {/* Charts and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressChart />
            <StatsSummary />
          </div>
        </div>
      )}

      {activeTab === 'detailed' && (
        <div className="space-y-8 text-black">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Detailed Progress</h2>
            <p className="text-gray-600">View your detailed nutrition data over time.</p>
            
            {/* Full width chart in detailed view */}
            <div className="mt-6">
              <ProgressChart />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Extended Statistics</h2>
            <StatsSummary />
          </div>
        </div>
      )}
        </main>
      <Footer />
    </>
  );
}

// Helper component for summary cards
function SummaryCard({ title, value, icon, description }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}