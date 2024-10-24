'use client'; // Ensure this runs on the client side

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Firebase function to track auth state changes
import { auth } from '@/lib/firebase/config'; // Import the initialized auth from config.js
import { logOutUser } from '@/lib/firebase/authHelpers'; // Import the logout helper function

export const Navbar = () => {
  const [user, setUser] = useState(null); // State to track if a user is logged in or not

  useEffect(() => {
    // Listen for authentication state changes (whether the user is logged in or not)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // If a user is logged in, update the state
      } else {
        setUser(null); // If no user is logged in, reset the state
      }
    });
    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  // Handle user logout when the logout button is clicked
  const handleLogout = async () => {
    try {
      await logOutUser(); // Call the logout helper function
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-pink-50">
      <div className="max-w-auto mx-auto px-1 sm:px-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1 text-black">
                <Link href="/" className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4">
                  Home Logo
                </Link>
                <Link href="/workshop" className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4">
                  PC Workshop
                </Link>
                <Link href="/products" className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4">
                  Products
                </Link>
                <Link href="/guides" className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4">
                  Guides
                </Link>
                <Link href="/generate" className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4">
                  Generate PC
                </Link>
                <Link href="/credits" className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4">
                  Credits
                </Link>
              </div>
            </div>
          </div>

          {/* Display login/logout button based on user authentication state */}
          <div className="flex items-center">
            {user ? (
              <>
                <span className="mr-4 text-gray-800">Welcome, {user.displayName || user.email}</span> {/* Display name or email */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl focus-within:bg-slate-200 hover:bg-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/account/login" className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4">
                Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;