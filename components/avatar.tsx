/*A react component that displays a user avatar image. It takes an optional parameter
to control the behavior and appearance of the avatar. */

"use client"

import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/hooks/useLoginModal';
import { useSession } from 'next-auth/react';


type Props = {
    profilePicture?: string //profile image of the user
    username?: string //username of the user to navigate to user profile
    isLarge?: boolean; //optional prop whether the avatar is large (for the user profile page)
    isMedium?: boolean; //optional prop whether the avatar is medium (for the post)
}

const Avatar: React.FC<Props> = ({ isLarge, profilePicture, username, isMedium }) => {

    const router = useRouter(); //get the router object
    const handleLogin = useLoginModal(); //hook to manage the visibility of the login modal
    const session = useSession() //get the current session


    const onClick = useCallback(() => {
        if (!session.data?.user) {
            /*If no current session (if user is not logged in), open login modal */
            return handleLogin.onOpen();
        }
        router.push(`/user/${username}`) //if user is logged in, navigate to user profile page
    }, [session.data?.user, router, username, handleLogin])

    return (
        <button
            aria-label='User Avatar'
            onClick={onClick}
            className={`
                ${isLarge ? 'w-32 h-32' : 'w-7 h-7'}
                ${isMedium ? 'w-[68px] h-[68px]' : 'w-7 h-7'}
                rounded-full hover:opacity-90 hover:scale-105 transition duration-500
                cursor-pointer relative
            `}
        >
            <Image
                src={profilePicture ?? '/placeholder.png'} /*If profile picture exists,
                it is displayed, else the a default placeholder image is displayed */
                alt='User Avatar'
                fill
                className='object-cover rounded-full'
            />
        </button>
    );
};

export default Avatar;
