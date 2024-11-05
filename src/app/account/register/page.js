'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/firebase/authHelpers';

const Register = () => {
  const router = useRouter();
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
  const [error, setError] = useState(null);

  // Handle input changes and password validation checks
  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordValidations({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      numeric: /[0-9]/.test(value),
    });
  };

  // Handle registration
  const handleRegister = async () => {
    // Validate required fields
    if (!username) {
      setError('Username is required.');
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

    try {
      await registerUser(username, email, password);
      console.log('User registered successfully');
      router.push('/'); // Redirect to the home page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle specific Firebase registration error codes
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4"> {/* Background: Charcoal */}
      <div className="bg-[#DBAE58] rounded-lg shadow-md p-8 max-w-lg w-full text-center border border-[#DBAE58] transition-shadow duration-300 hover:shadow-lg space-y-4"> {/* Gold Background with subtle hover effect and wider box */}
        <h1 className="text-2xl font-semibold text-gray-800">Create an Account</h1>

        {/* Username, Email, and Password Registration */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={emailConfirmation}
          onChange={(e) => setEmailConfirmation(e.target.value)}
          placeholder="Confirm your email"
          required
          className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="Enter your password"
          required
          className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Password Policy Checkmarks */}
        <div className="text-left">
          <p className={`text-sm ${passwordValidations.length ? 'text-green-500' : 'text-red-500'}`}>• Minimum password length of 6 characters</p>
          <p className={`text-sm ${passwordValidations.uppercase ? 'text-green-500' : 'text-red-500'}`}>• At least one uppercase character</p>
          <p className={`text-sm ${passwordValidations.numeric ? 'text-green-500' : 'text-red-500'}`}>• At least one numeric character</p>
        </div>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm your password"
          required
          className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Terms of Service Checkbox */}
        <div className="flex items-start justify-start">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
            className="mr-2 mt-1 w-4 h-4"
          />
          <label className="text-gray-800">I have read and consent to the <a href="/terms-of-service" className="text-blue-500 hover:underline transition-colors duration-200">terms of service</a>.</label>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Register
        </button>

        {/* Link to Login Page */}
        <p className="text-sm text-gray-600">
          Already have an account? <a href="/account/login" className="text-blue-500 hover:underline transition-colors duration-200">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
