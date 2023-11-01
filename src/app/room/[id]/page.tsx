'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { getCurrentUser, listenAuth } from '@/firebase/auth';
import { getUsers, listenUsers } from '@/firebase/users';
import { getRoomById } from '@/firebase/rooms';
import { getMessages, listenMessages } from '@/firebase/messages';
import MessageForm from '@/components/MessageForm';
import { Room } from '@/types/room';
import { Message, MessageDetails } from '@/types/message';
import MessageList from '@/components/MessageList';
import HelperMessage from '@/components/HelperMessage';
import { UserProfile } from '@/types/user';

interface Params {
    id: string;
}

interface RoomProps {
    params: Params;
}

const Room = ({ params }: RoomProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [room, setRoom] = useState<Room | null>(null);
    const [userId, setUserId] = useState<string>(getCurrentUser()?.uid ?? '');
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<UserProfile[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const roomFromStore = await getRoomById(params.id);
            setRoom(roomFromStore);
            setIsLoading(false);
        };
        fetch();
    }, [params.id]);

    useEffect(() => {
        listenAuth((userId: string) => setUserId(userId));
    }, []);

    useEffect(() => {
        if (!room) return;

        const fetch = async () => {
            setMessages(await getMessages(room.id));
            setUsers(await getUsers());

            listenMessages(room.id, (messages: Message[]) => setMessages(messages));
            listenUsers((users: UserProfile[]) => setUsers(users));
        };
        fetch();
    }, [room]);

    const userIdMapToName = useMemo(() => {
        return new Map<string, string>(users.map(({ id, name }) => [id, name]));
    }, [users]);

    const messageDetails: MessageDetails[] = useMemo(() => {
        return messages.map((msg) => ({
            ...msg,
            creatorName: userIdMapToName.get(msg.creatorId) ?? 'Unknown User',
        }));
    }, [messages, userIdMapToName]);

    if (isLoading) return <HelperMessage message="Loading..." />;
    if (!room) return <HelperMessage message="Room not found..." />;

    return (
        <main className="h-full flex flex-col px-7 gap-6">
            <div>
                <h2 className="text-2xl font-bold my-4">{room.name}</h2>
                <div className="text-gray-500">Created at {new Date(room.createdAt).toLocaleString()}</div>
                <div className="text-gray-500">Last updated at {new Date(room.lastUpdatedAt).toLocaleString()}</div>
            </div>
            <MessageList messages={messageDetails} userId={userId} />
            <MessageForm id={room.id} isAuth={userId !== ''} userId={userId} />
        </main>
    );
};

export default Room;
