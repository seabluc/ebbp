'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';

const Register = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="flex items-center justify-center h-screen bg-[#4D585B]"> {/* Background: Charcoal */}
      <div className="bg-[#488A99] p-6 rounded-lg shadow-md w-80 border-2 border-[#DBAE58]"> {/* Background: Dark Aqua, Border: Gold */}
        <h2 className="text-center text-2xl font-semibold mb-4 text-[#DBAE58]"> {/* Title: Gold */}
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#E0E0E0]" htmlFor="email"> {/* Light text */}
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-[#DBAE58] rounded-md bg-[#4D585B] text-white focus:outline-none focus:ring-2 focus:ring-[#DBAE58]" /* Dark input with Gold border and focus */
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#E0E0E0]" htmlFor="password"> {/* Light text */}
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-[#DBAE58] rounded-md bg-[#4D585B] text-white focus:outline-none focus:ring-2 focus:ring-[#DBAE58]" /* Matching input style */
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#DBAE58] text-[#4D585B] font-semibold rounded-md hover:bg-[#E0C88B] focus:outline-none focus:ring-2 focus:ring-[#DBAE58]" /* Gold button with dark text */
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
