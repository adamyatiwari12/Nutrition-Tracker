'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Book, Apple, Award, Users, Github } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        <div className="bg-gradient-to-b from-green-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                About NutriTrack
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                A simple, open-source nutrition tracking application built with Next.js and Tailwind CSS.
                NutriTrack helps you monitor your daily food intake and achieve your health goals.
              </p>
              <div className="mt-8">
                <a
                  href="https://github.com/yourusername/nutritrack"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Overview</h2>
            <p className="text-gray-600 mb-4">
              NutriTrack is a personal project created to demonstrate modern web development techniques
              and provide a useful tool for those interested in monitoring their nutrition. The application
              focuses on simplicity and ease of use while providing powerful tracking capabilities.
            </p>
            <p className="text-gray-600">
              This project was built using Next.js, React, Tailwind CSS, and a variety of modern web
              technologies. It&apos;s open-source and available for anyone to use, modify, or contribute to.
            </p>
          </div>
        </div>

        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureBlock 
                icon={<Book className="h-6 w-6 text-green-500" />}
                title="Food Database"
                description="Simple JSON-based food database with common nutritional values"
              />
              <FeatureBlock 
                icon={<Apple className="h-6 w-6 text-green-500" />}
                title="Meal Logging"
                description="Quickly log meals and track daily nutritional intake"
              />
              <FeatureBlock 
                icon={<Award className="h-6 w-6 text-green-500" />}
                title="Goal Setting"
                description="Set personal nutrition goals and track your progress"
              />
              <FeatureBlock 
                icon={<Users className="h-6 w-6 text-green-500" />}
                title="Local Storage"
                description="Data saved locally in your browser with optional export"
              />
            </div>
          </div>
        </div>

        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Tech Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {['Next.js', 'React', 'Tailwind CSS', 'Lucide Icons', 'localStorage API', 'Vercel', 'ESLint', 'Jest'].map((tech) => (
                <div key={tech} className="bg-gray-50 px-4 py-3 rounded-md text-center">
                  <span className="text-gray-700">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div className="bg-green-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to try NutriTrack?
            </h2>
            <p className="text-gray-600 mb-8">
              Check out the demo or contribute to the project on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/tracker"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
              >
                View Demo
              </a>
              <a
                href="https://github.com/yourusername/nutritrack"
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                GitHub Repository
              </a>
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
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="mr-4 bg-green-100 rounded-full p-2">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}