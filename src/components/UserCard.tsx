import React from 'react';
import { UserProfile } from '@/types/user';

interface UserCardProps {
    user: UserProfile;
}
const UserCard = ({ user }: UserCardProps) => {
    const { id, name, email, createdAt } = user;

    return (
        <div>
            <div>{name}</div>
            <div>{email}</div>
            <div>Joined: {new Date(createdAt).toLocaleDateString()}</div>
        </div>
    );
};

export default UserCard;
