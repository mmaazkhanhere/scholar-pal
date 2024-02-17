"use client"

import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/hooks/useLoginModal';


type Props = {
    profilePicture?: string
    username?: string
    isLarge?: boolean;
};

const Avatar: React.FC<Props> = ({ isLarge, profilePicture, username }) => {

    const router = useRouter();
    const handleLogin = useLoginModal();


    const onClick = useCallback(() => {
        if (!profilePicture) {
            return handleLogin.onOpen();
        }
        router.push(`/user/${username}`)
    }, [profilePicture, router, username, handleLogin])

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
                src={profilePicture ?? '/placeholder.png'}
                alt='User Avatar'
                fill
                className='object-cover rounded-full'
            />
        </button>
    );
};

export default Avatar;
