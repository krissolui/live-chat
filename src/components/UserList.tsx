import React from 'react';
import { UserProfile } from '@/types/user';
import UserCard from './UserCard';

interface UserListProps {
    users: UserProfile[];
}
const UserList = ({ users }: UserListProps) => {
    return (
        <div>
            <h3>Users</h3>
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserList;
