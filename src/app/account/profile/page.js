'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/firebase/authContext';
import { useRouter } from 'next/navigation';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { fbdb } from '@/lib/firebase/config';
import Link from 'next/link';
import { useSharedData } from '@/context/SharedDataContext';

const Profile = () => {
    const { user, loading, updateUser } = useAuth();
    const { showSavedBuild } = useSharedData();
    const router = useRouter();
    const [displayName, setDisplayName] = useState('');
    const [accountCreatedDate, setAccountCreatedDate] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [savedBuilds, setSavedBuilds] = useState([]);

    useEffect(() => {
        if (!loading) {
            if (user) {
                setDisplayName(user.displayName || '');
                setAccountCreatedDate(user.accountCreatedDate ? new Date(user.accountCreatedDate.seconds * 1000).toLocaleString() : '');
                fetchSavedBuilds();
            } else {
                router.push('/account/login'); // Redirect to login page if user is not logged in
            }
        }
    }, [user, loading, router]);

    // Validate display name (similar to username validation)
    const isDisplayNameValid = (displayName) => /^[a-zA-Z0-9_]{3,20}$/.test(displayName);

    // Handle updating the display name
    const handleSaveChanges = async () => {
        // Clear previous messages
        setMessage(null);
        setError(null);

        if (!isDisplayNameValid(displayName)) {
            setError('Display name must be 3-20 characters and can only contain letters, numbers, and underscores.');
            return;
        }

        try {
            await updateUser({ displayName });
            setMessage('Profile updated successfully.');
        } catch (error) {
            console.error('Error updating profile:', error.message);
            setError('Failed to update profile.');
        }
    };

    // Fetch saved builds from Firestore
    const fetchSavedBuilds = async () => {
        if (!user) return;

        try {
            const buildsCollection = collection(fbdb, 'users', user.uid, 'builds');
            const buildsSnapshot = await getDocs(buildsCollection);
            const builds = buildsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSavedBuilds(builds);
        } catch (error) {
            console.error('Error fetching saved builds:', error.message);
        }
    };

    // Profile.js - Updated handleLoadBuild function to ensure sequential state updates
    const handleLoadBuild = async (buildId) => {
        try {
            const buildDoc = await getDoc(doc(fbdb, 'users', user.uid, 'builds', buildId));
            if (buildDoc.exists()) {
                const buildData = buildDoc.data();

                // Use showSavedBuild() to update all shared state values in one go
                showSavedBuild(
                    buildData.cpu || null,
                    buildData.motherboard || null,
                    buildData.memory || [],
                    buildData.storage || [],
                    buildData.videoCard || null,
                    buildData.powerSupply || null,
                    buildData.cpuCooler || null
                );


                // Redirect to the workshop page
                router.push('/workshop');
            } else {
                console.error('No such build found.');
            }
        } catch (error) {
            console.error('Error loading saved build:', error.message);
        }
    };


    // Show loading indicator while waiting for authentication status
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4">
                <div className="text-center text-white">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#4D585B] p-4">
            <div className="bg-[#DBAE58] rounded-lg shadow-md p-8 max-w-lg w-full text-center border border-[#DBAE58] transition-shadow duration-300 hover:shadow-lg space-y-4">
                <h1 className="text-2xl font-semibold text-gray-800">Your Profile</h1>

                <div>
                    <label className="block text-left mb-1 text-gray-700">Display Name:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                            setError(null); // Clear error on input change
                            setMessage(null); // Clear success message on input change
                        }}
                        className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 mt-1">{error}</p>}
                </div>

                <div>
                    <label className="block text-left mb-1 text-gray-700">Account Created:</label>
                    <p className="p-2 w-full border rounded-lg bg-gray-100 text-gray-700">
                        {accountCreatedDate}
                    </p>
                </div>

                {message && <p className="text-green-500">{message}</p>}

                <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Save Changes
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mt-6">Your Saved Builds</h2>
                {savedBuilds.length > 0 ? (
                    <div className="space-y-4 mt-4">
                        {savedBuilds.map((build) => (
                            <div key={build.id} className="p-4 bg-white rounded-lg shadow-md">
                                <h3 className="font-semibold">Build: {build.id}</h3>
                                <button
                                    onClick={() => handleLoadBuild(build.id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 transition-all duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    Load Build
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 mt-4">You have no saved builds.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;