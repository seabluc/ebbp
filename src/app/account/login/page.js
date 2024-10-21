'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { useRouter } from 'next/navigation'

const Login = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail('');
      setPassword('');
      router.push('/')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#4D585B]"> {/* Background: Charcoal */}
      <div className="bg-[#488A99] p-6 rounded-lg shadow-md w-80"> {/* Background: Dark Aqua */}
        <h2 className="text-center text-2xl font-semibold text-[#DBAE58] mb-4"> {/* Title: Gold */}
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#DBAE58]" htmlFor="email"> {/* Label: Gold */}
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-[#DBAE58] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DBAE58]" // Gold border
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#DBAE58]" htmlFor="password"> {/* Label: Gold */}
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-[#DBAE58] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DBAE58]" // Gold border
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#DBAE58] text-white font-semibold rounded-md hover:bg-[#488A99] focus:outline-none focus:ring-2 focus:ring-[#DBAE58]" // Button: Gold
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
