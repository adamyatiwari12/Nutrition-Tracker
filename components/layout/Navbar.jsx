'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {Menu , X} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [user] = useAuthState(auth);
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tracker', href: '/tracker' },
    { name: 'Progress', href: '/progress' },
    { name: 'About', href: '/about' },
  ];

  function handleSignOut() {
    signOut(auth)
    sessionStorage.removeItem('user');
  }

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">NutriTrack</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href 
                    ? 'bg-green-700 text-white' 
                    : 'text-white hover:bg-green-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!user ? <Link
              href="/sign-in"
              className="px-3 py-2 rounded-md text-sm font-medium bg-white text-green-600 hover:bg-gray-100"
            >
              Sign In
            </Link> :
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium bg-white text-green-600 hover:bg-gray-100"
              onClick={handleSignOut}
            > 
              Sign Out
            </Link>}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            {!user ? (
              <Link
                href="/sign-in"
                className="block px-3 py-2 rounded-md text-base font-medium bg-white text-green-600 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            ) : (
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium bg-white text-green-600 hover:bg-gray-100"
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
              >
                Sign Out
              </Link>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'bg-green-700 text-white'
                    : 'text-white hover:bg-green-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
          </div>
        </div>
      )}
    </nav>
  );
}