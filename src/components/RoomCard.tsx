import React from 'react';
import Link from 'next/link';
import { Room } from '@/types/room';

interface RoomCardProps {
    room: Room;
}
const RoomCard = ({ room }: RoomCardProps) => {
    const { id, name, createdAt } = room;
    return (
        <Link href={`/room/${id}`}>
            <div>{name}</div>
            <div>{new Date(createdAt).toLocaleString()}</div>
        </Link>
    );
};

export default RoomCard;
