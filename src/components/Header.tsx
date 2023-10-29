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
        <div>
            <Link href="/">Rooms</Link>
            {isAuth && <button onClick={handleToggleShowRoomForm}>Create Room</button>}
            {isAuth ? <button onClick={signOutFromGoogle}>Sign out</button> : <button onClick={signIn}>Sign in</button>}
            {showRoomForm && <RoomForm userId={userId} />}
        </div>
    );
};

export default Header;
