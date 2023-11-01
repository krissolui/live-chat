import { getFirestore, collection, getDocs, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { UserProfile } from '@/types/user';
import { USER_COLLECTION } from '@/config/firestore';
import { app } from './firebase';
import { converter } from './converter';

const db = getFirestore(app);
const userCollection = collection(db, USER_COLLECTION).withConverter(converter<UserProfile>());

export const createUserProfile = async (user: UserProfile): Promise<void> => {
    if (await isUserExists(user.id)) return;

    try {
        await setDoc(doc(db, USER_COLLECTION, user.id), user);
        console.log('create user profile success');
    } catch (err) {
        console.error('create user profile error', err);
    }
};

export const getUsers = async (): Promise<UserProfile[]> => {
    try {
        const querySnapshot = await getDocs(userCollection);
        return querySnapshot.docs
            .map((doc) => {
                return doc.data();
            })
            .sort((a, b) => b.createdAt - a.createdAt);
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

export const listenUsers = (callback: (users: UserProfile[]) => void) => {
    return onSnapshot(userCollection, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return { ...data, id: doc.id };
        });

        callback(users);
    });
};
