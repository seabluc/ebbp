'use client';

import { useEffect } from "react";

const Auth = () => {
  useEffect(() => {
    // Dynamically load FirebaseUI to ensure it's only imported on the client side
    const loadFirebaseUI = async () => {
      if (typeof window !== 'undefined') {
        const { startFirebaseUI } = await import('@/lib/firebase/firebaseui');
        startFirebaseUI('#firebaseui-auth-container');  // Start FirebaseUI in the specified DOM element
      }
    };

    loadFirebaseUI();  // Load FirebaseUI when the component is mounted
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4"> {/* Background: Charcoal */}
      <div className="bg-[#DBAE58] rounded-lg shadow-lg p-8 max-w-md w-full text-center border-2 border-[#DBAE58]"> {/* Gold Background with Gold Border */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Login to Your Account</h1>
        <div id="firebaseui-auth-container" className="mb-6"></div> {/* FirebaseUI widget will render here */}
        <p className="text-sm text-gray-600">
          Don't have an account? Sign up using Google or Email.
        </p>
      </div>
    </div>
  );
};

export default Auth;
