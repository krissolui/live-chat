import { app } from './firebase';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, User } from 'firebase/auth';

const auth = getAuth(app);
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

export const getCurrentUser = () => auth.currentUser;

export const signInWithGoogle = async (): Promise<User | null> => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log('auth result', result);
        return result.user;
    } catch (err) {
        console.error('auth error', err);
        return null;
    }
};

export const signOutFromGoogle = async () => {
    return signOut(auth)
        .then(() => {
            console.log('user is sign out');
        })
        .catch((err) => {
            console.error('user sign out error', err);
        });
};

export const listenAuth = (callback: (userId: string) => void) => {
    return auth.onAuthStateChanged((user) => {
        callback(user?.uid ?? '');
    });
};
