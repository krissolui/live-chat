import {
    QuerySnapshot,
    addDoc,
    collection,
    getDocs,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { Message, MessageInfo } from '@/types/message';
import { MESSAGE_COLLECTION } from '@/config/firestore';
import { app } from './firebase';
import { converter } from './converter';
import { updateRoomLastUpdatedAt } from './rooms';

const db = getFirestore(app);
const messageCollection = collection(db, MESSAGE_COLLECTION).withConverter(converter<MessageInfo>());

export const sendMessage = async (message: Omit<MessageInfo, 'createdAt'>) => {
    const now = Date.now();
    try {
        const docRef = await addDoc(messageCollection, {
            ...message,
            createdAt: now,
        });
        console.log('send message success');
        await updateRoomLastUpdatedAt(message.roomId, now);
    } catch (err) {
        console.error('send message error', err);
    }
};

export const getMessages = async (roomId: string): Promise<Message[]> => {
    try {
        const q = query(messageCollection, where('roomId', '==', roomId), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs
            .map((doc) => {
                const data = doc.data();
                return { ...data, id: doc.id };
            })
            .sort((a, b) => a.createdAt - b.createdAt);
    } catch (err) {
        console.error('get messages error', err);
        return [];
    }
};

export const listenMessages = (roomId: string, callback: (messages: Message[]) => void) => {
    const q = query(messageCollection, where('roomId', '==', roomId), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return { ...data, id: doc.id };
        });
        callback(messages);
    });
};
