'use client'
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import Link from "next/link";

const Register = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}> {/* Keep onSubmit here */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit" // Keep button type as submit
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Register
          </button>
        </form>
        <div className="flex justify-center pt-3">
          <Link href="/account/login" className="">
            Have an account? <u className="text-blue-500">Log in</u>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
