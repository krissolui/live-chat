'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '@/firebase/users';
import { getRooms, listenRooms } from '@/firebase/rooms';
import RoomList from '@/components/RoomList';
import UserList from '@/components/UserList';
import { UserProfile } from '@/types/user';
import { Room } from '@/types/room';

export default function Home() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        listenRooms((rooms: Room[]) => setRooms(rooms));
    }, []);

    useEffect(() => {
        const fetch = async () => {
            setUsers(await getUsers());
            setRooms(await getRooms());
        };

        fetch();
    }, []);

    return (
        <main className="">
            Live Chat
            <RoomList rooms={rooms} />
            <UserList users={users} />
        </main>
    );
}
