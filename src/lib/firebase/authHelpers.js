import {
  signOut,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, fbdb } from '@/lib/firebase/config';
import { getDocs, query, where, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Helper function to check if an email is already registered
export const checkEmailExists = async (email) => {
  try {
    // Firebase handles invalid email formats internally, so you don't need to validate here
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;  // true if email exists, false otherwise
  } catch (error) {
    // If Firebase throws an "invalid-email" error, we can just ignore it
    if (error.code === 'auth/invalid-email') {
      console.error('Invalid email format:', error.message);
      return false;
    }
    console.error('Error checking email:', error);
    throw error;
  }
};



// Helper function to log the user out
export const logOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Helper function to sign in the user with email/username and password
export const signInUser = async (emailOrUsername, password) => {
  try {
    let email = emailOrUsername;

    // If the input is a username (i.e., doesn't include '@'), we need to retrieve the associated email
    if (!email.includes('@')) {
      console.log(`Attempting to find email for username: ${emailOrUsername}`);
      const usersQuery = query(collection(fbdb, 'users'), where('username', '==', emailOrUsername));
      const querySnapshot = await getDocs(usersQuery);
      if (!querySnapshot.empty) {
        email = querySnapshot.docs[0].data().email;
        console.log(`Found email: ${email} for username: ${emailOrUsername}`);
      } else {
        console.error('No account found with that username.');
        throw new Error('No account found with that username.');
      }
    }

    // Attempt to sign in using the retrieved email and provided password
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
};

// Helper function to register a new user
export const registerUser = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update user profile to add the displayName
    await updateProfile(userCredential.user, { displayName: username });

    // Create user document in Firestore
    await setDoc(doc(fbdb, 'users', userCredential.user.uid), {
      username,
      email,
      displayName: username,
      accountCreatedDate: serverTimestamp(),
      isAdmin: false,
    });

    console.log('User registered successfully');
    return userCredential;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Helper function to send a password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
