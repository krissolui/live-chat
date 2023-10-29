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
        <div>
            <input
                name="message"
                value={isAuth ? message : 'Please sign in to participate.'}
                onChange={handleOnChange}
                disabled={!isAuth}
            />
            <button onClick={handleOnSubmit} disabled={!isAuth || message.length < 1}>
                Send
            </button>
        </div>
    );
};

export default MessageForm;
