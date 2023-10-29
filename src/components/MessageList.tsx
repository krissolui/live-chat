import React from 'react';
import { MessageDetails } from '@/types/message';
import MessageCard from './MessageCard';
import EmptyMessage from './EmptyMessage';

interface MessageListProps {
    messages: MessageDetails[];
    userId: string;
}

const MessageList = ({ messages, userId }: MessageListProps) => {
    return (
        <div className="flex flex-col gap-4">
            {messages.length === 0 && <EmptyMessage message="Be the first to start the conversation!" />}
            {messages.map((message) => (
                <MessageCard key={message.id} msg={message} isCurrentUser={message.creatorId === userId} />
            ))}
        </div>
    );
};

export default MessageList;
