import { signOut, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/config'; // Use the initialized auth instance

// Helper function to check if an email is already registered
export const checkEmailExists = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email); // Fetch sign-in methods using the shared auth
    return signInMethods.length > 0;  // Return true if the email has sign-in methods
  } catch (error) {
    console.error('Error checking email:', error);  // Log any errors that occur during the email check
    throw error;
  }
};

// Helper function to log the user out
export const logOutUser = async () => {
  try {
    await signOut(auth); // Sign out the user from Firebase Auth using the shared auth instance
    console.log('User logged out successfully');  // Log success message
  } catch (error) {
    console.error('Error logging out:', error);  // Log any errors that occur during logout
    throw error;
  }
};
