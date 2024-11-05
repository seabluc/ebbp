'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signInUser } from '@/lib/firebase/authHelpers';

const Auth = () => {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const firebaseUiInitialized = useRef(false); // Ref to track initialization status

  // Handle traditional email/username and password login
  const handleSignIn = async () => {
    try {
      await signInUser(emailOrUsername, password); // Use helper function to sign in
      console.log('Successfully signed in with email/username and password.');
      router.push('/'); // Redirect to the home page after successful login
    } catch (error) {
      console.error('Error signing in with email/username and password:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  useEffect(() => {
    if (!firebaseUiInitialized.current && typeof window !== 'undefined') {
      firebaseUiInitialized.current = true; // Set to true before actually starting FirebaseUI

      const loadFirebaseUI = async () => {
        const { startFirebaseUI } = await import('@/lib/firebase/firebaseui');
        // Ensure the container is not already populated to avoid double initialization
        if (!document.querySelector("#firebaseui-auth-container").hasChildNodes()) {
          startFirebaseUI('#firebaseui-auth-container');
          console.log('FirebaseUI started successfully.');
        }
      };

      loadFirebaseUI();
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4">
      <div className="bg-[#DBAE58] rounded-lg shadow-md p-8 max-w-md w-full text-center border border-[#DBAE58] transition-shadow duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login to Your Account</h1>
        
        {/* Username/Email and Password Login */}
        <input
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="Enter your username or email"
          className="mb-4 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mb-4 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 w-full transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign In
        </button>
        <p className="text-sm text-gray-600 mb-6">
          <a href="/account/forgot-password" className="text-blue-500 hover:underline transition-colors duration-200">Forgot password?</a>
        </p>

        {/* FirebaseUI for Google Sign-In */}
        <div id="firebaseui-auth-container" className="mb-6"></div>

        {/* Register Link */}
        <p className="text-sm text-gray-600">
          Don't have an account? <a href="/account/register" className="text-blue-500 hover:underline transition-colors duration-200">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default Auth;
