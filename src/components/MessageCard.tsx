import React from 'react';
import { Message } from '@/types/message';

interface MessageCardProps {
    msg: Message;
}

const MessageCard = ({ msg }: MessageCardProps) => {
    const { message, createdAt } = msg;
    return (
        <div>
            <div>{message}</div>
            <div>{new Date(createdAt).toLocaleString()}</div>
        </div>
    );
};

export default MessageCard;
