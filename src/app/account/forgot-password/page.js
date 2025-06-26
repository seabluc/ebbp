'use client';

import { useState, useEffect } from 'react';
import { resetPassword } from '@/lib/firebase/authHelpers';
import { useAuth } from '@/lib/firebase/authContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

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
    <div className="flex items-center justify-center">
      <div className="rounded-lg shadow-md p-8 max-w-md w-full text-center border transition-shadow duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Forgot Password</h1>
        <span className="relative w-full py-2 md:py-1 flex flex-col items-center justify-center">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 min-h-5 min-w-5 size-4 text-muted-foreground opacity-80" />
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null); // Clear error on input change
              setMessage(null); // Clear success message on input change
            }}
            placeholder="Email address"
            className="pl-10 bg-slate-200/50 rounded-lg shadow-md"
          />
        </span>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button
          onClick={handlePasswordReset}
          className="mt-2.5 mb-3 bg-[#DBAE58] hover:bg-[#E0BA68] text-gray-800 dark:text-gray-100 border dark:border-gray-200/75 rounded-lg w-full shadow-md font-semibold text-base"
        >
          Reset Password
        </Button>
        <p className="text-sm text-gray-600">
          Remember your password? <a href="/account/login" className="text-blue-500 hover:underline transition-colors duration-200">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
