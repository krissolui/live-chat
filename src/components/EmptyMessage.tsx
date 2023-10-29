import React from 'react';

interface EmptyMessage {
    message: string;
}

const EmptyMessage = ({ message }: EmptyMessage) => {
    return <div className="text-violet-600 italic">{message}</div>;
};

export default EmptyMessage;
