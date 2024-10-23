import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { auth } from '@/lib/firebase/config';  // Import your Firebase configuration

// Define ActionCodeSettings
const actionCodeSettings = {
    url: 'http://localhost:3000/account/login',  // Redirect URL after sign-in
    handleCodeInApp: true,  // Set to true for email link sign-in to open in the app
};

// FirebaseUI config
const uiConfig = {
    signInFlow: 'popup', // Use popup instead of redirect
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,  // Email/Password provider
            requireDisplayName: false,  // Do not require display name during sign up
            signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,  // Use email link sign-in
            emailLinkSignIn: () => actionCodeSettings,  // Set ActionCodeSettings for email link
        },
        GoogleAuthProvider.PROVIDER_ID,  // Google sign-in
    ],
    tosUrl: '/terms-of-service',  // Terms of service URL
    privacyPolicyUrl: '/privacy-policy',  // Privacy policy URL
    callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            console.log('Login successful:', authResult);
            window.location.href = '/';  // Redirect to home page after login
            return false;  // Prevent default redirect behavior
        },
        signInFailure: (error) => {
            console.error('Sign-in failed:', error);
            return Promise.resolve();  // Handle sign-in failure gracefully
        },
    },
};

// Initialize FirebaseUI
let ui;
export const initializeFirebaseUI = () => {
    if (!ui) {
        ui = new firebaseui.auth.AuthUI(auth);  // Ensure we use the initialized auth
        console.log('FirebaseUI initialized');
    }
    return ui;
};

// Start FirebaseUI
export const startFirebaseUI = (elementId) => {
    const ui = initializeFirebaseUI();
    ui.start(elementId, uiConfig);  // Start FirebaseUI with the updated configuration
    console.log('FirebaseUI started in', elementId);
};
