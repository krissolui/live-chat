import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { UserProfile } from '@/types/user';
import { USER_COLLECTION } from '@/config/firestore';
import { app } from './firebase';
import { converter } from './converter';

const db = getFirestore(app);

export const createUserProfile = async (user: UserProfile): Promise<void> => {
    if (await isUserExists(user.id)) return;

    try {
        await setDoc(doc(db, USER_COLLECTION, user.id), user);
        console.log('Document written with ID: ', user.id);
    } catch (err) {
        console.error('create user profile error', err);
    }
};

export const getUsers = async (): Promise<UserProfile[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, USER_COLLECTION).withConverter(converter<UserProfile>()));
        return querySnapshot.docs.map((doc) => {
            return doc.data();
        });
    } catch (err) {
        console.error('get users error', err);
        return [];
    }
};

const isUserExists = async (id: string): Promise<boolean> => {
    const docRef = doc(db, USER_COLLECTION, id).withConverter(converter<UserProfile>());
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
};
