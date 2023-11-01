import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { Room, RoomInfo } from '@/types/room';
import { ROOM_COLLECTION } from '@/config/firestore';
import { app } from './firebase';
import { converter } from './converter';

const db = getFirestore(app);
const roomCollection = collection(db, ROOM_COLLECTION).withConverter(converter<RoomInfo>());

export const createRoom = async (room: RoomInfo) => {
    try {
        const docRef = await addDoc(roomCollection, room);
        console.log('create room success');
    } catch (err) {
        console.error('create room error', err);
    }
};

export const getRooms = async (): Promise<Room[]> => {
    try {
        const querySnapshot = await getDocs(roomCollection);
        return querySnapshot.docs
            .map((doc) => {
                const data = doc.data();
                return { ...data, id: doc.id };
            })
            .sort((a, b) => b.createdAt - a.createdAt);
    } catch (err) {
        console.error('get rooms error', err);
        return [];
    }
};

export const getRoomById = async (id: string): Promise<Room | null> => {
    try {
        const docRef = doc(db, ROOM_COLLECTION, id).withConverter(converter<RoomInfo>());
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;

        const data = docSnap.data();
        return { ...data, id: docSnap.id };
    } catch (err) {
        console.error('get room by id error', err);
        return null;
    }
};

export const updateRoomLastUpdatedAt = async (id: string, lastUpdatedAt: number) => {
    try {
        const docRef = doc(db, ROOM_COLLECTION, id).withConverter(converter<RoomInfo>());
        setDoc(docRef, { lastUpdatedAt }, { merge: true });
    } catch (err) {
        console.error('update room error', err);
    }
};

export const listenRooms = (callback: (rooms: Room[]) => void) => {
    return onSnapshot(roomCollection, (querySnapshot) => {
        const rooms = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return { ...data, id: doc.id };
        });

        callback(rooms);
    });
};
