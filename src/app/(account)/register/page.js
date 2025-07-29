'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, checkUsernameExists } from '@/lib/firebase/authHelpers';
import { useAuth } from '@/lib/firebase/authContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LockKeyholeOpen, LockKeyhole, Mail, MailCheck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Register = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    numeric: false,
  });
  const [usernameError, setUsernameError] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      // If the user is already logged in, redirect them to the home page.
      router.push('/');
    }
  }, [user, loading, router]);

  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordValidations({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      numeric: /[0-9]/.test(value),
    });
    setError(null); // Clear error message on password change
  };

  const isUsernameValid = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);

  const checkUsernameAvailability = debounce(async (username) => {
    if (isUsernameValid(username)) {
      try {
        const usernameExists = await checkUsernameExists(username);
        setUsernameError(usernameExists ? 'Username is already taken.' : null);
      } catch {
        setUsernameError('Error checking username availability. Please try again.');
      }
    } else {
      setUsernameError('Username must be 3-20 characters and can only contain letters, numbers, and underscores.');
    }
  }, 500);

  const handleUsernameChange = (value) => {
    setUsername(value);
    setUsernameError(null); // Clear error message on username change
    setError(null); // Clear general error message on username change
    checkUsernameAvailability(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError(null); // Clear previous error before proceeding

    if (!username) {
      setError('Username is required.');
      return;
    }
    if (!isUsernameValid(username)) {
      setError('Username must be 3-20 characters and can only contain letters, numbers, and underscores.');
      return;
    }
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (email !== emailConfirmation) {
      setError('Emails do not match.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setError('You must accept the terms of service to register.');
      return;
    }
    if (usernameError) {
      setError('Username issue: ' + usernameError);
      return;
    }

    try {
      await registerUser(username, email, password);
      router.push('/'); // Redirect to the home page after successful registration
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError('Failed to register. Please try again.');
      }
    }
  };

  // Show a loading state while verifying the user's authentication status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Prevent rendering the registration form if user is already logged in
  }

  return (
    <div id="" className="flex flex-col items-center gap-6 md:gap-12 mb-6 md:mb-12">
      <header className="page-header">
        <h1>Account Registration</h1>
      </header>
      <Card className="w-full p-4 md:p-3 max-w-sm md:max-w-2xl text-center rounded-lg transition-shadow duration-300 shadow-md hover:shadow-lg">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Create an Account</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="flex flex-col items-center gap-y-3 md:gap-y-6">
            <span className="relative w-full py-2 md:py-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 min-h-5 min-w-5 size-4 text-muted-foreground opacity-80" />
              <Input
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="Username"
                required
                autoComplete="username"
                className="pl-10 bg-slate-200/50 rounded-lg shadow-md"
              />
              {usernameError && <p className="text-red-500 mb-4">{usernameError}</p>}
            </span>
            <span className="relative w-full py-2 md:py-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 min-h-5 min-w-5 size-4 text-muted-foreground opacity-80" />
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null); // Clear error message on email change
                }}
                placeholder="Email address"
                required
                autoComplete="email"
                className="pl-10 bg-slate-200/50 rounded-lg shadow-md"
              />
            </span>
            <span className="relative w-full py-2 md:py-1">
              <MailCheck className="absolute left-3 top-1/2 -translate-y-1/2 min-h-5 min-w-5 size-4 text-muted-foreground opacity-80" />
              <Input
                type="email"
                value={emailConfirmation}
                onChange={(e) => {
                  setEmailConfirmation(e.target.value);
                  setError(null); // Clear error message on email confirmation change
                }}
                placeholder="Confirm your email"
                required
                autoComplete="email"
                className="pl-10 bg-slate-200/50 rounded-lg shadow-md"
              />
            </span>
            <span className="relative w-full py-2 md:py-1">
              <LockKeyholeOpen className="absolute left-3 top-1/2 -translate-y-1/2 min-h-5 min-w-5 size-4 text-muted-foreground opacity-80" />
              <Input
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="new-password"
                className="pl-10 bg-slate-200/50 rounded-lg shadow-md"
              />
            </span>
            <div className="text-left">
              <p className={`text-sm ${passwordValidations.length ? 'text-green-500' : 'text-red-500'}`}>• Minimum password length of 6 characters</p>
              <p className={`text-sm ${passwordValidations.uppercase ? 'text-green-500' : 'text-red-500'}`}>• At least one uppercase character</p>
              <p className={`text-sm ${passwordValidations.numeric ? 'text-green-500' : 'text-red-500'}`}>• At least one numeric character</p>
            </div>

            <span className="relative w-full py-2 md:py-1">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 min-h-5 min-w-5 size-4 text-muted-foreground opacity-80" />
              <Input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  setError(null); // Clear error message on password confirmation change
                }}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className="pl-10 bg-slate-200/50 rounded-lg shadow-md"
              />
            </span>
            <div className="max-w-48 md:max-w-full flex items-center justify-center gap-x-2 md:gap-x-1.5">
              <Input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setError(null); // Clear error message on checkbox change
                }}
                required
                className="min-h-4 min-w-4 size-3 md:size-4"
              />
              <Label className="text-sm text-gray-600 dark:text-gray-50">
                I have read and consent to the <a href="/terms-of-service" className="text-blue-500 hover:underline transition-colors duration-200">terms of service</a>.
              </Label>
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
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-50">
            Already have an account? <Link href="/login" className="text-blue-500 hover:underline transition-colors duration-200">Login here</Link>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
