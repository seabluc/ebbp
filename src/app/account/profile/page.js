'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/firebase/authContext';
import { useRouter } from 'next/navigation';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { fbdb } from '@/lib/firebase/config';
// import { useSharedData } from '@/context/SharedDataContext';
import Image from 'next/image';

const Profile = () => {
    const showSavedBuild = () => { return 'lol' };
    const { user, loading, updateUser } = useAuth();
    //const { showSavedBuild } = useSharedData();
    const router = useRouter();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [accountCreatedDate, setAccountCreatedDate] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [savedBuilds, setSavedBuilds] = useState([]);

    useEffect(() => {
        if (!loading) {
            if (user) {
                setDisplayName(user.displayName || '');
                setEmail(user.email || '');
                setAccountCreatedDate(user.accountCreatedDate ? new Date(user.accountCreatedDate.seconds * 1000).toLocaleString() : '');
                fetchUserDetails();
                fetchSavedBuilds();
            } else {
                router.push('/account/login'); // Redirect to login page if user is not logged in
            }
        }
    }, [user, loading, router]);

    const fetchUserDetails = async () => {
        if (!user) return;
        try {
            const userDoc = await getDoc(doc(fbdb, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUsername(userData.username || '');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    const isDisplayNameValid = (displayName) => /^[a-zA-Z0-9_]{3,20}$/.test(displayName);

    const handleSaveChanges = async () => {
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

    const handleLoadBuild = async (buildId) => {
        try {
            const buildDoc = await getDoc(doc(fbdb, 'users', user.uid, 'builds', buildId));
            if (buildDoc.exists()) {
                const buildData = buildDoc.data();
                // showSavedBuild(
                //     buildData.cpu || null,
                //     buildData.motherboard || null,
                //     buildData.memory || [],
                //     buildData.storage || [],
                //     buildData.videoCard || null,
                //     buildData.powerSupply || null,
                //     buildData.cpuCooler || null
                // );

                router.push('/workshop');
            } else {
                console.error('No such build found.');
            }
        } catch (error) {
            console.error('Error loading saved build:', error.message);
        }
    };

    const handleDeleteBuild = async (buildId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this build? This action cannot be undone.');
        if (!confirmDelete) {
            return;
        }

        try {
            await deleteDoc(doc(fbdb, 'users', user.uid, 'builds', buildId));
            setMessage('Build deleted successfully.');
            setSavedBuilds(savedBuilds.filter(build => build.id !== buildId));
        } catch (error) {
            console.error('Error deleting build:', error.message);
            setError('Failed to delete build. Please try again.');
        }
    };

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
        <div className="flex flex-col min-h-screen bg-[#4D585B] p-4 lg:flex-row lg:gap-8 lg:px-16 lg:py-8">
            {/* Profile Section */}
            <div className="flex flex-col bg-[#DBAE58] p-8 rounded-lg shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0 space-y-6 lg:self-start">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Your Profile</h1>

                <div>
                    <label className="block text-left mb-1 text-gray-700">Email:</label>
                    <p className="p-2 w-full border rounded-lg bg-gray-100 text-gray-700">
                        {email}
                    </p>
                </div>

                <div>
                    <label className="block text-left mb-1 text-gray-700">Username:</label>
                    <p className="p-2 w-full border rounded-lg bg-gray-100 text-gray-700">
                        {username}
                    </p>
                </div>

                <div>
                    <label className="block text-left mb-1 text-gray-700">Display Name:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                            setError(null);
                            setMessage(null);
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Save Changes
                </button>
            </div>

            {/* Builds Collection Section */}
            <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Your Saved Builds</h2>
                {savedBuilds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedBuilds.map((build) => (
                            <div key={build.id} className="p-4 bg-[#DBAE58] rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                                <h3 className="font-semibold text-xl text-gray-800 text-center mb-4">Build: {build.id}</h3>
                                <div className="flex flex-wrap justify-center gap-4 mb-4">
                                    {/* Display images and types of the parts in the build */}
                                    {build.cpu && (
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-1">
                                                <Image src={build.cpu.image} alt="CPU" layout="intrinsic" width={60} height={60} className="object-contain" />
                                            </div>
                                            <span className="text-xs text-center mt-1">CPU</span>
                                        </div>
                                    )}
                                    {build.motherboard && (
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-1">
                                                <Image src={build.motherboard.image} alt="Motherboard" layout="intrinsic" width={60} height={60} className="object-contain" />
                                            </div>
                                            <span className="text-xs text-center mt-1">Motherboard</span>
                                        </div>
                                    )}
                                    {build.memory && build.memory.length > 0 && (
                                        build.memory.map((memoryItem, index) => (
                                            <div key={index} className="flex flex-col items-center">
                                                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-1">
                                                    <Image src={memoryItem.image} alt="Memory" layout="intrinsic" width={60} height={60} className="object-contain" />
                                                </div>
                                                <span className="text-xs text-center mt-1">Memory</span>
                                            </div>
                                        ))
                                    )}
                                    {build.storage && build.storage.length > 0 && (
                                        build.storage.map((storageItem, index) => (
                                            <div key={index} className="flex flex-col items-center">
                                                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-1">
                                                    <Image src={storageItem.image} alt="Storage" layout="intrinsic" width={60} height={60} className="object-contain" />
                                                </div>
                                                <span className="text-xs text-center mt-1">Storage</span>
                                            </div>
                                        ))
                                    )}
                                    {build.videoCard && (
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-1">
                                                <Image src={build.videoCard.image} alt="Video Card" layout="intrinsic" width={60} height={60} className="object-contain" />
                                            </div>
                                            <span className="text-xs text-center mt-1">Video Card</span>
                                        </div>
                                    )}
                                    {build.powerSupply && (
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-1">
                                                <Image src={build.powerSupply.image} alt="Power Supply" layout="intrinsic" width={60} height={60} className="object-contain" />
                                            </div>
                                            <span className="text-xs text-center mt-1">Power Supply</span>
                                        </div>
                                    )}
                                    {build.cpuCooler && (
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-1">
                                                <Image src={build.cpuCooler.image} alt="CPU Cooler" layout="intrinsic" width={60} height={60} className="object-contain" />
                                            </div>
                                            <span className="text-xs text-center mt-1">CPU Cooler</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-around mt-2">
                                    <button
                                        onClick={() => handleLoadBuild(build.id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Load Build
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBuild(build.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    >
                                        Delete Build
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">You have no saved builds.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
