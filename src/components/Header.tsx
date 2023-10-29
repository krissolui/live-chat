'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { listenAuth, signInWithGoogle, signOutFromGoogle } from '@/firebase/auth';
import { createUserProfile } from '@/firebase/users';
import RoomForm from './RoomForm';

const Header = () => {
    const [showRoomForm, setShowRoomForm] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');
    const isAuth = userId !== '';

    useEffect(() => {
        listenAuth((userId) => setUserId(userId));
    }, []);

    const signIn = async () => {
        const user = await signInWithGoogle();
        if (!user) return;
        if (!user.displayName || !user.email) return;

        await createUserProfile({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            createdAt: Date.now(),
        });
    };

    const handleToggleShowRoomForm = () => setShowRoomForm(!showRoomForm);

    return (
        <nav className="w-full flex justify-between p-4 mb-2 border-b border-violet-600 text-violet-600 font-semibold text-lg">
            <Link className="hover:text-violet-800" href="/">
                Rooms
            </Link>
            {isAuth && (
                <button className="hover:text-violet-800" onClick={handleToggleShowRoomForm}>
                    Create Room
                </button>
            )}
            {isAuth ? (
                <button className="hover:text-violet-800" onClick={signOutFromGoogle}>
                    Sign out
                </button>
            ) : (
                <button className="hover:text-violet-800" onClick={signIn}>
                    Sign in
                </button>
            )}
            {showRoomForm && <RoomForm userId={userId} hideRoomForm={handleToggleShowRoomForm} />}
        </nav>
    );
};

export default Header;
