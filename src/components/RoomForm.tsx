import React, { useState } from 'react';
import { createRoom } from '@/firebase/rooms';

interface RoomFormProps {
    userId: string;
}

const RoomForm = ({ userId }: RoomFormProps) => {
    const [name, setName] = useState<string>('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const handleOnCreate = async () => {
        await createRoom({
            name: name,
            createdAt: Date.now(),
            lastUpdatedAt: Date.now(),
            creatorId: userId,
        });
    };

    return (
        <div>
            <input name="name" value={name} placeholder="Room Name (Min. 3 characters)" onChange={handleOnChange} />
            <button onClick={handleOnCreate} disabled={name.length < 3}>
                Create Room
            </button>
        </div>
    );
};

export default RoomForm;
