"use client"

import useUser from '@/hooks/useUser';
import React, { useState } from 'react';
import Avatar from '../avatar';
import FollowerDetail from './follower-detail';
import { FaMedal, FaStar } from "react-icons/fa";
import { format } from 'date-fns';
import Link from 'next/link';
import Button from '../button';
import useEditModal from '@/hooks/useEditModal';

const UserSidebar = () => {

    const [isLoading, setIsLoading] = useState(false)

    const { user } = useUser();
    const handleEditModal = useEditModal()

    const formattedDate = user?.createdAt ? format(new Date(user.createdAt), 'PPP') : '';

    return (
        <div
            className='flex flex-col items-start justify-center text-[#343a40]
        p-5'
        >
            <Avatar isProfileAvatar className='self-center' />
            <h3 className='text-3xl font-bold'>
                {user?.name}
            </h3>
            <div className='flex items-center justify-start gap-x-4 '>
                <p className='text-[#343a40]/40'>
                    @{user?.username}
                </p>
                {
                    user?.age && <span>Age: {user?.age}</span>
                }
            </div>
            <p className=''>{user?.fieldOfStudy}</p>
            {
                user?.tutoringAvailable ? (
                    <Link
                        href="/tutor-page"
                        className='flex items-center justify-start gap-x-2  text-[#1abc9c]'
                    >
                        <FaStar /> Tutoring Available - {user?.tutoringRating} <FaMedal />
                    </Link>
                ) : <p className='my-1'>Not Available for Tutoring</p>
            }

            <p className=''>
                Joined: <span>{formattedDate}</span>
            </p>

            <Button
                label='Edit Profile'
                ariaLabel='Edit Profile Button'
                onClick={handleEditModal.onOpen}
                className='w-full'
                disabled={isLoading}
            />

            <p className=''>
                {user?.bio}
            </p>
            <FollowerDetail
                followers={user?.followerIds}
                following={user?.followingIds}
            />
            <hr className='my-2' />
        </div>
    );
};

export default UserSidebar;
