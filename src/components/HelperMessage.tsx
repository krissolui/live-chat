import React from 'react';

interface HelperMessage {
    message: string;
}

const HelperMessage = ({ message }: HelperMessage) => {
    return <div className="w-full my-10 text-center">{message}</div>;
};

export default HelperMessage;
