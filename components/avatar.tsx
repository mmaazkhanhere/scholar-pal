"use client"

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import getCurrentUser from '@/action/getCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';

import { User } from '@prisma/client';


type Props = {
    currentUser: User
    isLarge?: boolean;
};

const Avatar: React.FC<Props> = ({ isLarge }) => {

    const router = useRouter();
    const handleLogin = useLoginModal();
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            setCurrentUser(user as User);
        };
        fetchUser()
    }, [])

    const onClick = useCallback(() => {
        console.log(handleLogin.isOpen)
        if (currentUser === null) {
            return handleLogin.onOpen();
        }
        router.push(`/user/${currentUser.username}`)
    }, [currentUser, handleLogin, router])


    return (
        <button
            aria-label='User Avatar'
            onClick={onClick}
            className={`
                ${isLarge ? 'w-32 h-32' : 'w-7 h-7'}
                rounded-full hover:opacity-90 hover:scale-105 transition duration-500
                cursor-pointer relative
            `}
        >
            <Image
                src={currentUser?.profilePicture ?? '/placeholder.png'}
                alt='User Avatar'
                fill
                className='object-cover rounded-full'
            />
        </button>
    );
};

export default Avatar;
