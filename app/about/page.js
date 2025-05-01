'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutInfo from '@/components/about/AboutInfo';
import { Book, Apple, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                About NutriTrack
              </h1>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Learn more about our mission to make nutrition tracking simple and effective
              </p>
            </div>
          </div>
        </div>

        {/* Feature blocks */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <FeatureBlock 
                icon={<Book className="mx-auto h-12 w-12 text-green-500" />}
                title="Evidence-Based"
                description="Built on scientific principles of nutrition and metabolism"
              />
              <FeatureBlock 
                icon={<Apple className="mx-auto h-12 w-12 text-green-500" />}
                title="Comprehensive Database"
                description="Access to thousands of foods with detailed nutritional information"
              />
              <FeatureBlock 
                icon={<Award className="mx-auto h-12 w-12 text-green-500" />}
                title="User-Friendly"
                description="Intuitive interface designed for effortless daily tracking"
              />
              <FeatureBlock 
                icon={<Users className="mx-auto h-12 w-12 text-green-500" />}
                title="Privacy Focused"
                description="Your data stays on your device and is never shared"
              />
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <AboutInfo />

        {/* CTA Section */}
        <div className="bg-green-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to start tracking?</span>
              <span className="block text-green-600">Begin your health journey today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/tracker"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Get started
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
                >
                  Create account
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Helper component for feature blocks
function FeatureBlock({ icon, title, description }) {
  return (
    <div className="p-6">
      {icon}
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  );
}