'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth, fbdb } from '@/lib/firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Fetch additional user data from Firestore
                try {
                    const userDocRef = doc(fbdb, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            ...userDoc.data() // Merge Firestore data with user object
                        });
                    } else {
                        console.error('User document does not exist');
                        setUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user data from Firestore:', error);
                    setUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
