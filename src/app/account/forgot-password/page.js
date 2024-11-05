'use client';

import { useState } from 'react';
import { resetPassword } from '@/lib/firebase/authHelpers';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle password reset email submission
  const handlePasswordReset = async () => {
    try {
      await resetPassword(email); // Use helper function to send reset email
      setMessage('Password reset email sent. Please check your inbox.');
      setError(null);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError('Failed to send password reset email. Please try again.');
      setMessage(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4"> {/* Background: Charcoal */}
      <div className="bg-[#DBAE58] rounded-lg shadow-md p-8 max-w-md w-full text-center border border-[#DBAE58] transition-shadow duration-300 hover:shadow-lg"> {/* Gold Background with subtle hover effect */}
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Forgot Password</h1>
        
        {/* Email Input for Password Reset */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        {/* Back to Login Link */}
        <p className="text-sm text-gray-600">
          Remember your password? <a href="/account/login" className="text-blue-500 hover:underline transition-colors duration-200">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
