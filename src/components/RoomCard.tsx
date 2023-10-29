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
            <div className="w-full h-full flex flex-col justify-between p-4 rounded-lg hover:scale-105 hover:drop-shadow-md duration-200 bg-gray-800">
                <h3 className="text-lg font-medium">{name}</h3>
                <div className="text-gray-500">{new Date(createdAt).toLocaleString()}</div>
            </div>
        </Link>
    );
};

export default RoomCard;
