'use client';

import { Search, BarChart4, PieChart, Calendar, Check } from "lucide-react";

export default function FeaturesHighlight() {
  const features = [
    {
      icon: <Search className="h-12 w-12 text-green-600" />,
      title: "Easy Food Search",
      description: "Quickly find and log your meals using our comprehensive food database with nutritional information.",
    },
    {
      icon: <BarChart4 className="h-12 w-12 text-green-600" />,
      title: "Nutrition Tracking",
      description: "Monitor your daily calorie intake and key macronutrients to stay on top of your health goals.",
    },
    {
      icon: <PieChart className="h-12 w-12 text-green-600" />,
      title: "Visual Progress",
      description: "View your nutrition data in intuitive charts and graphs to better understand your eating habits.",
    },
    {
      icon: <Calendar className="h-12 w-12 text-green-600" />,
      title: "Daily Meal Logs",
      description: "Organize your food intake by meals and days for a clear overview of your nutrition history.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Nutrition Tracking Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NutriTrack provides all the tools you need to monitor and improve your nutrition habits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-green-600 rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Health Journey?</h3>
              <p className="mb-6">
                Track your meals, monitor your nutrition, and achieve your health goals with our easy-to-use tools.
              </p>
              <a 
                href="/tracker" 
                className="inline-block bg-white text-green-600 font-medium py-2 px-6 rounded-lg shadow hover:bg-gray-100 transition duration-300"
              >
                Get Started Now
              </a>
            </div>
            <div className="md:w-1/2 bg-green-700 p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">App Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-2 text-green-300" />
                  <span>Access to extensive food database</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-2 text-green-300" />
                  <span>Detailed macronutrient breakdown</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-2 text-green-300" />
                  <span>User-friendly interface</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-2 text-green-300" />
                  <span>Personalized nutrition insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}