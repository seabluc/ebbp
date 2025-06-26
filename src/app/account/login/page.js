'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInUser } from '@/lib/firebase/authHelpers';
import { useAuth } from '@/lib/firebase/authContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Icons';
import { UserPen, UserLock } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const firebaseUiInitialized = useRef(false);

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

  useEffect(() => {
    if (!firebaseUiInitialized.current && typeof window !== 'undefined') {
      firebaseUiInitialized.current = true;

      // Import FirebaseUI asynchronously
      const loadFirebaseUI = async () => {
        const { startFirebaseUI } = await import('@/lib/firebase/firebaseui'); // Ensure this path is correct

        // Ensure FirebaseUI container exists and is not already populated to avoid double initialization
        if (!document.querySelector("#firebaseui-auth-container").hasChildNodes()) {
          startFirebaseUI('#firebaseui-auth-container');
        }
      };

      loadFirebaseUI();
    }
  }, []); // Run once on component mount

  // Show a loading state while verifying the user's authentication status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Prevent rendering login form if user is already logged in
  }

  return (
    <div id="" className="flex flex-col items-center gap-6 md:gap-12">
      <header className="w-full h-14 md:h-16 p-[14px] md:p-4 bg-[#7A8588] text-white text-center text-xl md:text-2xl font-bold shadow-md">
        <h1>Log Into Your Account</h1>
      </header>
      <Card className="w-full p-4 md:p-3 max-w-sm md:max-w-2xl text-center rounded-lg transition-shadow duration-300 shadow-md hover:shadow-lg">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Welcome Back</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="flex flex-col items-center">
            {/* Username/Email & Password Inputs */}
            <div className="w-full flex flex-col gap-y-3 md:gap-y-6">
              <span className="relative w-full py-2 md:py-1">
                <UserPen className="absolute left-3 top-1/2 -translate-y-1/2 min-h-5 min-w-5 size-4 text-muted-foreground opacity-80" />
                <Input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => {
                    setEmailOrUsername(e.target.value);
                    setError(null); // Clear error message on input change
                  }}
                  placeholder="Username or Email"
                  className="pl-10 bg-slate-200/50 rounded-lg shadow-md"
                  required
                  autoComplete="username"
                />
              </span>
              <span className="relative w-full py-2 md:py-1">
                <UserLock className="absolute left-3 top-1/2 -translate-y-1/2 min-h-5 min-w-5 size-4 text-muted-foreground opacity-80" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null); // Clear error message on input change
                  }}
                  placeholder="Password"
                  className="pl-10 bg-slate-200/50 rounded-lg shadow-md"
                  required
                  autoComplete="current-password"
                />
              </span>
            </div>
            {/* Password Checkbox & Forgot Link */}
            <div className="w-full flex items-center justify-between px-1.5 pt-3 pb-5 md:px-2">
              <span className="flex items-center gap-x-1.5">
                <Input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="min-h-4 min-w-4 size-3 md:size-4"
                />
                <Label htmlFor="show-password" className="text-gray-700 dark:text-gray-50 text-sm">
                  Show Password
                </Label>
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-50">
                <Link href="/account/forgot-password" className="text-blue-500 hover:underline">Forgot password?</Link>
              </p>
            </div>

            {/* Sign In Button */}
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="submit"
              className="mt-2.5 mb-3 bg-[#DBAE58] hover:bg-[#E0BA68] text-gray-800 dark:text-gray-100 border dark:border-gray-200/75 rounded-lg w-full shadow-md font-semibold text-base"
            >
              Sign In
            </Button>
          </form>

          <div id="firebaseui-auth-container" className="my-6"></div>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-50">
            Don't have an account? <Link href="/account/register" className="text-blue-500 hover:underline transition-colors duration-200">Register here</Link>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
