import { initializeApp } from 'firebase/app';
import { API_KEY, APP_ID, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID } from '@/config/firebase';

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    projectId: PROJECT_ID,
    storageBucket: `${PROJECT_ID}.appspot.com`,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
