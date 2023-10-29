'use client';

import React from 'react';
import { Room } from '@/types/room';
import RoomCard from './RoomCard';

interface RoomListProps {
    rooms: Room[];
}

const RoomList = ({ rooms }: RoomListProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Rooms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </div>
    );
};

export default RoomList;
