import { sendMessage } from '@/firebase/messages';
import React, { useState } from 'react';

interface MessageFormProps {
    id: string;
    isAuth: boolean;
    userId: string;
}
const MessageForm = ({ id, isAuth, userId }: MessageFormProps) => {
    const [message, setMessage] = useState<string>('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    };

    const handleOnSubmit = async () => {
        await sendMessage({
            message,
            roomId: id,
            creatorId: userId,
        });
        setMessage('');
    };

    return (
        <div className="w-full flex gap-4 my-4">
            <input
                className="w-full outline-none resize-none rounded-md px-4 py-2 disabled:bg-gray-500 text-black disabled:text-gray-400 disabled:border disabled:border-gray-400"
                name="message"
                value={isAuth ? message : 'Please sign in to participate.'}
                onChange={handleOnChange}
                disabled={!isAuth}
            />
            <button
                className="px-4 rounded-md bg-violet-600 hover:bg-violet-800 disabled:bg-violet-400"
                onClick={handleOnSubmit}
                disabled={!isAuth || message.length < 1}
            >
                Send
            </button>
        </div>
    );
};

export default MessageForm;
