'use client';

import React, { useEffect, useState } from 'react';
import { getCurrentUser, listenAuth } from '@/firebase/auth';
import { getRoomById } from '@/firebase/rooms';
import { getMessages, listenMessages } from '@/firebase/messages';
import MessageForm from '@/components/MessageForm';
import { Room } from '@/types/room';
import { Message } from '@/types/message';
import MessageList from '@/components/MessageList';

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

    useEffect(() => {
        const fetch = async () => {
            const roomFromStore = await getRoomById(params.id);
            setRoom(roomFromStore);
            setIsLoading(false);
        };
        fetch();
    });

    useEffect(() => {
        listenAuth((userId: string) => setUserId(userId));
    }, []);

    useEffect(() => {
        if (!room) return;

        const fetch = async () => {
            const messagesFromStore = await getMessages(room.id);
            setMessages(messagesFromStore);
            listenMessages(room.id, (messages: Message[]) => setMessages(messages));
        };
        fetch();
    }, [room]);

    if (isLoading) return <div>Loading...</div>;
    if (!room) return <div>Room not found</div>;

    return (
        <div>
            <div>{room.name}</div>
            <div>Created in {new Date(room.createdAt).toLocaleString()}</div>
            <div>Last updated at {new Date(room.lastUpdatedAt).toLocaleString()}</div>
            <MessageList messages={messages} />
            <MessageForm id={room.id} isAuth={userId !== ''} userId={userId} />
        </div>
    );
};

export default Room;
