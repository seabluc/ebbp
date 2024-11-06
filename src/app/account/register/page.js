'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, checkUsernameExists } from '@/lib/firebase/authHelpers';
import { useAuth } from '@/lib/firebase/authContext';
import debounce from 'lodash.debounce';

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
      <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Prevent rendering the registration form if user is already logged in
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4">
      <div className="bg-[#DBAE58] rounded-lg shadow-md p-8 max-w-lg w-full text-center border border-[#DBAE58] transition-shadow duration-300 hover:shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Create an Account</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            placeholder="Enter your username"
            required
            autoComplete="username"
            className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {usernameError && <p className="text-red-500 mb-4">{usernameError}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null); // Clear error message on email change
            }}
            placeholder="Enter your email"
            required
            autoComplete="email"
            className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <input
            type="email"
            value={emailConfirmation}
            onChange={(e) => {
              setEmailConfirmation(e.target.value);
              setError(null); // Clear error message on email confirmation change
            }}
            placeholder="Confirm your email"
            required
            autoComplete="email"
            className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="new-password"
            className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="text-left mb-4">
            <p className={`text-sm ${passwordValidations.length ? 'text-green-500' : 'text-red-500'}`}>• Minimum password length of 6 characters</p>
            <p className={`text-sm ${passwordValidations.uppercase ? 'text-green-500' : 'text-red-500'}`}>• At least one uppercase character</p>
            <p className={`text-sm ${passwordValidations.numeric ? 'text-green-500' : 'text-red-500'}`}>• At least one numeric character</p>
          </div>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
              setError(null); // Clear error message on password confirmation change
            }}
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <div className="flex items-start justify-start mb-4">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setError(null); // Clear error message on checkbox change
              }}
              required
              className="mr-2 mt-1 w-4 h-4"
            />
            <label className="text-gray-800">
              I have read and consent to the <a href="/terms-of-service" className="text-blue-500 hover:underline transition-colors duration-200">terms of service</a>.
            </label>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Already have an account? <a href="/account/login" className="text-blue-500 hover:underline transition-colors duration-200">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
