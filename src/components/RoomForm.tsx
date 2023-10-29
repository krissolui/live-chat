import React, { useState } from 'react';
import { createRoom } from '@/firebase/rooms';

interface RoomFormProps {
    userId: string;
    hideRoomForm: () => void;
}

const RoomForm = ({ userId, hideRoomForm }: RoomFormProps) => {
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
        hideRoomForm();
    };

    return (
        <div className="fixed w-full h-full flex flex-col m-auto items-center justify-center bg-gray-950/40 font-normal">
            <div className="flex flex-col gap-4 p-6 rounded-xl bg-gray-800 shadow-lg">
                <button className="w-fit text-white hover:text-violet-600" onClick={hideRoomForm}>
                    &#10005;
                </button>
                <input
                    className="outline-none w-fit h-auto rounded-md px-4 py-2 text-black"
                    name="name"
                    value={name}
                    placeholder="Room Name (Min. 3 characters)"
                    onChange={handleOnChange}
                />
                <button
                    className="w-fit h-fit overflow-wrap px-4 py-2 mx-auto rounded-md bg-violet-600 enabled:hover:bg-violet-800 disabled:bg-violet-400 text-white"
                    onClick={handleOnCreate}
                    disabled={name.length < 3}
                >
                    Create Room
                </button>
            </div>
        </div>
    );
};

export default RoomForm;
