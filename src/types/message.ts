export type MessageInfo = {
    creatorId: string;
    roomId: string;
    message: string;
    createdAt: number;
};

export type Message = MessageInfo & {
    id: string;
};
