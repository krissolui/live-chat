import React from 'react';
import { Message } from '@/types/message';
import MessageCard from './MessageCard';

interface MessageListProps {
    messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
    return (
        <div>
            {messages.map((message) => (
                <MessageCard key={message.id} msg={message} />
            ))}
        </div>
    );
};

export default MessageList;
