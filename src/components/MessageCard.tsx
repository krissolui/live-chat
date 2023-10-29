import React from 'react';
import { MessageDetails } from '@/types/message';

interface MessageCardProps {
    msg: MessageDetails;
    isCurrentUser: boolean;
}

const MessageCard = ({ msg, isCurrentUser }: MessageCardProps) => {
    const { message, creatorName, createdAt } = msg;
    return (
        <div
            className={`${isCurrentUser ? 'bg-violet-600' : 'bg-gray-800'} w-full sm:w-3/5 px-4 py-2 ${
                isCurrentUser && 'ml-auto'
            } rounded-lg`}
        >
            <div className={isCurrentUser ? 'text-gray-400' : 'text-gray-500'}>
                {<span className="font-medium">{creatorName}</span>} - {new Date(createdAt).toLocaleString()}
            </div>
            <div>&gt; {message}</div>
        </div>
    );
};

export default MessageCard;
