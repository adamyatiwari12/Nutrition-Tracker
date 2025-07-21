'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password);
        setEmail('');
        setPassword('');
        if(!res){
            alert('Invalid email or password. Please try again.');
            return;
        }
        console.log({res});
        sessionStorage.setItem('user', true)
        router.push('/')
    }catch(e){
        alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-gray-900 text-2xl mb-5 font-bold text-center">Sign In to NutriTrack</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button 
          onClick={handleSignIn}
          className="w-full p-3 bg-green-600 rounded text-white hover:bg-green-700 transition duration-300 font-medium"
        >
          Sign In
        </button>
        <h1 className="text-gray-900 text-sm mt-5 font-bold text-center">Doesn't have an account <Link href="/sign-up" className='text-blue-500 underline '>Sign Up</Link> instead</h1>
      </div>
    </div>
  );
};

export default SignIn;