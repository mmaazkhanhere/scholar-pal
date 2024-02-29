/*A react component that displays a user avatar image. It takes an optional parameter
to control the behavior and appearance of the avatar. */

"use client"

import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/hooks/useLoginModal';
import { useSession } from 'next-auth/react';
import useUser from '@/hooks/useUser';


type Props = {
    isProfileAvatar?: boolean; //optional prop whether the avatar is for user profile
    isPostAvatar?: boolean; //optional prop whether the avatar is for post
    isHeaderAvatar?: boolean; //optional prop whether the avatar is for header
    isNavigable?: boolean; //optional prop whether the avatar redirects to user profile
    className?: string; //optional prop to tailwind css classes
    profilePicture?: string;
    userId?: string;
}

const Avatar: React.FC<Props> = ({ isProfileAvatar, isPostAvatar, isHeaderAvatar, className, isNavigable, userId, profilePicture }) => {

    const router = useRouter(); //get the router object
    const handleLogin = useLoginModal(); //hook to manage the visibility of the login modal
    const session = useSession() //get the current session


    const onClick = useCallback(() => {
        if (!isNavigable) {
            if (!session.data?.user) {
                /*If no current session (if user is not logged in), open login modal */
                return handleLogin.onOpen();
            }
            router.push(`/user/${userId}`) //if user is logged in, navigate to user profile page
        }

    }, [isNavigable, userId, session.data?.user, router, handleLogin])

    return (
        <button
            aria-label='User Avatar'
            onClick={onClick}
            className={`
                ${className}
                ${isProfileAvatar && 'w-56 lg:w-64 h-56 lg:h-64'}
                ${isPostAvatar && ' w-12 lg:w-[68px] h-12 lg:h-[68px]'}
                ${isHeaderAvatar && 'w-7 h-7'}
                rounded-full hover:opacity-90 hover:scale-105 transition duration-500
                cursor-pointer relative
            `}
        >
            <Image
                src={profilePicture || '/placeholder.png'}
                alt='User Avatar'
                fill
                className='object-cover rounded-full'
            />
        </button>
    );
};

export default Avatar;
