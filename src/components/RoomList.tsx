import React from 'react';
import { Room } from '@/types/room';
import RoomCard from './RoomCard';

interface RoomListProps {
    rooms: Room[];
}

const RoomList = ({ rooms }: RoomListProps) => {
    return (
        <div>
            <h3>Rooms</h3>
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    );
};

export default RoomList;
