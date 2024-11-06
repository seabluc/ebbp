import { GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { auth } from '@/lib/firebase/config';  // Import your Firebase configuration

// FirebaseUI config for Google Sign-In
const getUiConfig = () => ({
    signInFlow: 'popup',
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,  // Google sign-in only
    ],
    tosUrl: '/terms-of-service',
    privacyPolicyUrl: '/privacy-policy',
    callbacks: {
        uiShown: () => {
            // UI shown callback, can be used to handle any actions needed on UI load
        },
        signInSuccessWithAuthResult: (authResult) => {
            window.location.href = '/'; // Redirect to home after successful login
            return false;
        },
        signInFailure: (error) => {
            console.error('Sign-in failed:', error.message);
            return Promise.resolve();
        },
    }
});

// Initialize FirebaseUI
let ui;
export const initializeFirebaseUI = () => {
    if (!ui) {
        ui = new firebaseui.auth.AuthUI(auth);
    }
    return ui;
};

// Start FirebaseUI
export const startFirebaseUI = (elementId) => {
    const ui = initializeFirebaseUI();
    const uiConfig = getUiConfig();

    if (!ui.isPendingRedirect()) {
        // Only start FirebaseUI if it's not already started
        if (!document.querySelector(`${elementId} .firebaseui-container`)) {
            ui.start(elementId, uiConfig);
        }
    }
};
