import React from 'react';
import { UserProfile } from '@/types/user';
import UserCard from './UserCard';
import EmptyMessage from './EmptyMessage';

interface UserListProps {
    users: UserProfile[];
}
const UserList = ({ users }: UserListProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Users</h2>
            <div className="flex flex-col gap-4">
                {users.length === 0 && <EmptyMessage message="Be the first to join this amazy platform!" />}
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default UserList;
