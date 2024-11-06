'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInUser } from '@/lib/firebase/authHelpers';
import { useAuth } from '@/lib/firebase/authContext';

const Login = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      // Redirect logged-in user to home page after confirming they are authenticated
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setError(null); // Clear previous error before attempting to log in

    if (!emailOrUsername || !password) {
      setError('Please enter your username/email and password.');
      return;
    }

    try {
      await signInUser(emailOrUsername, password);
      router.push('/'); // Redirect to the home page after successful login
    } catch (error) {
      console.error('Error signing in with email/username and password:', error.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  // Show a loading state while verifying the user's authentication status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Prevent rendering login form if user is already logged in
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4">
      <div className="bg-[#DBAE58] rounded-lg shadow-md p-8 max-w-md w-full text-center border border-[#DBAE58] transition-shadow duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login to Your Account</h1>

        <form onSubmit={handleSignIn}>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => {
              setEmailOrUsername(e.target.value);
              setError(null); // Clear error message on input change
            }}
            placeholder="Enter your username or email"
            className="mb-4 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null); // Clear error message on input change
            }}
            placeholder="Enter your password"
            className="mb-4 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="current-password"
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 w-full transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600 mb-6">
          <a href="/account/forgot-password" className="text-blue-500 hover:underline transition-colors duration-200">Forgot password?</a>
        </p>

        <div id="firebaseui-auth-container" className="mb-6"></div>

        <p className="text-sm text-gray-600">
          Don't have an account? <a href="/account/register" className="text-blue-500 hover:underline transition-colors duration-200">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
