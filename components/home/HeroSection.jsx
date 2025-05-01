'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-b from-green-500 to-green-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Track Your Nutrition Journey with Ease
            </h1>
            <p className="text-xl mb-8">
              Monitor your daily meals, analyze nutrients, and achieve your health goals with NutriTrack's powerful tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link 
                href="/tracker" 
                className="bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Start Tracking
              </Link>
              <Link 
                href="/about" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-green-600 font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 w-full max-w-md">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Join Our Newsletter</h3>
              <p className="text-gray-600 mb-4 text-center">
                Get the latest nutrition tips and healthy recipes delivered to your inbox.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}