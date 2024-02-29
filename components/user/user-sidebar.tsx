"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';

import FollowerDetail from './follower-detail';
import useEditModal from '@/hooks/useEditModal';
import Button from '../button';
import SocialMediaLink from './social-media-link';
import Avatar from '../avatar';

import { FaMedal, FaStar } from "react-icons/fa";

import useUser from '@/hooks/useUser';


const UserSidebar = () => {

    const [isLoading, setIsLoading] = useState(false);

    const userId = usePathname().split('/').pop();

    const { user } = useUser();
    const handleEditModal = useEditModal()

    const formattedDate = user?.createdAt ? format(new Date(user.createdAt), 'PPP') : '';

    return (
        <div
            className='flex flex-col items-start justify-center text-[#343a40]
        p-5'
        >
            <Avatar
                isNavigable={false}
                isProfileAvatar
                className='self-center'
            />
            <div className='flex items-end gap-x-5 mt-5'>
                <h3 className='text-2xl lg:text-4xl font-bold '>
                    {user?.name}
                </h3>
                <div className='flex items-center gap-x-1'>
                    <FaMedal className='w-5 lg:w-6 h-5 lg:h-6 text-[#1abc9c]' />
                    <span className='text-lg text-[#1abc9c]'>
                        {user?.score}
                    </span>
                </div>
            </div>

            <div
                className='flex items-center justify-start gap-x-4 pt-2 
                text-[#343a40]/60 lg:text-base'
            >
                <p className='font-semibold'>
                    @{user?.username}
                </p>
                {
                    user?.age && <span >{user?.age} years old</span>
                }
            </div>
            <p className='uppercase font-bold my-5 lg:text-lg'>
                {user?.fieldOfStudy}
            </p>
            {
                user?.tutoringAvailable ? (
                    <Link
                        href="/tutor-page"
                        className='flex items-center text-[#1abc9c] gap-x-5 mb-5'
                    >
                        <span className='lg:text-lg font-bold'>Available for Tutoring</span>
                        <div className='flex items-center gap-x-1'>
                            <FaStar />
                            <span>
                                {user?.tutoringRating}
                            </span>
                        </div>
                    </Link>
                ) : <p className='mb-5'>Not Available for Tutoring</p>
            }

            <p className='lg:text-lg mb-5'>
                {user?.bio}
            </p>

            {
                user?.id == userId ? (
                    <Button
                        label='Edit Profile'
                        ariaLabel='Edit Profile Button'
                        onClick={handleEditModal.onOpen}
                        className='w-full md:py-3 md:text-base'
                        disabled={isLoading}
                    />
                ) : (
                    <Button
                        label='Follow'
                        ariaLabel='Follow Button'
                        onClick={() => console.log('Follow')}
                        className='w-full md:py-3 md:text-base'
                        disabled={isLoading}
                    />
                )
            }

            <p className='font-bold lg:text-lg my-5'>
                Joined: <span className='font-normal text-sm lg:text-base'>
                    {formattedDate}
                </span>
            </p>

            <hr className='w-full' />

            <SocialMediaLink
                facebookUrl={user?.facebookProfile}
                linkedinUrl={user?.linkedInProfile}
                twitterUrl={user?.twitterUrl}
            />

            <FollowerDetail
                followers={user?.followerIds}
                following={user?.followingIds}
            />


        </div>
    );
};

export default UserSidebar;
