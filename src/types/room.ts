export type RoomInfo = {
    name: string;
    creatorId: string;
    createdAt: number;
    lastUpdatedAt: number;
};

export type Room = RoomInfo & {
    id: string;
};
