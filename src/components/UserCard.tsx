import React from 'react';
import { UserProfile } from '@/types/user';

interface UserCardProps {
    user: UserProfile;
}
const UserCard = ({ user }: UserCardProps) => {
    const { name, email, createdAt } = user;

    return (
        <div>
            <h3 className="text-lg font-medium">{name}</h3>
            <div>{email}</div>
            <div className="text-gray-500">Joined: {new Date(createdAt).toLocaleDateString()}</div>
        </div>
    );
};

export default UserCard;
