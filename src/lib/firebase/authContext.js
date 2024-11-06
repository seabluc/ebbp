'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, fbdb } from '@/lib/firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDocRef = doc(fbdb, 'users', currentUser.uid);
                    let userDoc = await getDoc(userDocRef);

                    // If the user document does not exist, create it
                    if (!userDoc.exists()) {
                        const userData = {
                            username: currentUser.displayName || '',
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            accountCreatedDate: serverTimestamp(),
                            isAdmin: false,
                        };
                        await setDoc(userDocRef, userData);
                        userDoc = await getDoc(userDocRef); // Retrieve the newly created document
                    }

                    // Update the user state with current authentication data and Firestore user data
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        ...userDoc.data(),
                    });
                } catch (error) {
                    console.error('Error fetching user data from Firestore:', error.message);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    // Update user data in Firestore and context
    const updateUser = async (updatedUserData) => {
        if (user) {
            try {
                const userDocRef = doc(fbdb, 'users', user.uid);
                await setDoc(userDocRef, updatedUserData, { merge: true });

                // Update Firebase auth profile if displayName has changed
                if (updatedUserData.displayName && updatedUserData.displayName !== user.displayName) {
                    await updateProfile(auth.currentUser, {
                        displayName: updatedUserData.displayName,
                    });
                }

                // Update user context
                setUser((prevUser) => ({
                    ...prevUser,
                    ...updatedUserData,
                }));
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
