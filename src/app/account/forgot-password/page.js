'use client';

import { useState, useEffect } from 'react';
import { resetPassword } from '@/lib/firebase/authHelpers';
import { useAuth } from '@/lib/firebase/authContext';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      // Redirect logged-in users to the home page once loading is complete and user is authenticated
      router.push('/');
    }
  }, [user, loading, router]);

  // Handle password reset email submission
  const handlePasswordReset = async () => {
    setMessage(null); // Clear previous messages
    setError(null);

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await resetPassword(email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch {
      setError('Failed to send password reset email. Please try again.');
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
    return null; // Prevent rendering the form if the user is logged in
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4">
      <div className="bg-[#DBAE58] rounded-lg shadow-md p-8 max-w-md w-full text-center border border-[#DBAE58] transition-shadow duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Forgot Password</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null); // Clear error on input change
            setMessage(null); // Clear success message on input change
          }}
          placeholder="Enter your email"
          className="mb-4 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handlePasswordReset}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 w-full transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Reset Password
        </button>

        <p className="text-sm text-gray-600">
          Remember your password? <a href="/account/login" className="text-blue-500 hover:underline transition-colors duration-200">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
