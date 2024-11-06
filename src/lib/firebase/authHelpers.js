import {
  signOut,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, fbdb } from '@/lib/firebase/config';
import {
  getDocs,
  query,
  where,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Helper function to check if an email is already registered
export const checkEmailExists = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0; // true if email exists, false otherwise
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      console.error('Invalid email format:', error.message);
      return false;
    }
    console.error('Error checking email:', error.message);
    throw error;
  }
};

// Helper function to check if a username already exists
export const checkUsernameExists = async (username) => {
  try {
    const usersQuery = query(
      collection(fbdb, 'users'),
      where('username', '==', username)
    );
    const querySnapshot = await getDocs(usersQuery);
    return !querySnapshot.empty; // true if username exists, false otherwise
  } catch (error) {
    console.error('Error checking username:', error.message);
    throw error;
  }
};

// Helper function to log the user out
export const logOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error.message);
    throw error;
  }
};

// Helper function to sign in the user with email/username and password
export const signInUser = async (emailOrUsername, password) => {
  try {
    let email = emailOrUsername;

    // If the input is a username (i.e., doesn't include '@'), we need to retrieve the associated email
    if (!email.includes('@')) {
      const usersQuery = query(
        collection(fbdb, 'users'),
        where('username', '==', emailOrUsername)
      );
      const querySnapshot = await getDocs(usersQuery);
      if (!querySnapshot.empty) {
        email = querySnapshot.docs[0].data().email;
      } else {
        throw new Error('No account found with that username.');
      }
    }

    // Attempt to sign in using the retrieved email and provided password
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing in user:', error.message);
    throw error;
  }
};

// Helper function to register a new user
export const registerUser = async (username, email, password) => {
  try {
    // Check if the username is already taken
    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      throw new Error('Username is already taken. Please choose a different one.');
    }

    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update user profile to add the displayName
    await updateProfile(userCredential.user, { displayName: username });

    // Create user document in Firestore
    const userData = {
      username,
      email,
      displayName: username,
      accountCreatedDate: serverTimestamp(),
      isAdmin: false,
    };

    await setDoc(doc(fbdb, 'users', userCredential.user.uid), userData);

    // Return an object containing both userCredential and the newly created user data
    return {
      ...userCredential,
      userData,
    };
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

// Helper function to send a password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    throw error;
  }
};
