"use client"

import React, { useCallback, useState } from 'react';
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
import useLoginModal from '@/hooks/useLoginModal';
import LoadingSpinner from '../loading-spinner';
import axios from 'axios';
import { successNotification } from '@/helpers/success-notification';
import { errorNotification } from '@/helpers/error-notification';
import FollowButton from '../follow-button';


const UserSidebar = () => {

    const [loading, setLoading] = useState(false);

    const userId = usePathname().split('/').pop();

    const { user: currentUser, isLoading, mutate } = useUser();
    const { user, mutate: mutateTargetUser } = useUser(userId);

    const handleEditModal = useEditModal()
    const handleLoginModal = useLoginModal();

    const formattedDate = user?.createdAt ? format(new Date(user.createdAt), 'PPP') : '';

    const handleFollow = useCallback(async () => {
        try {

            setLoading(true);

            if (!currentUser) {
                handleLoginModal.onOpen()
            };

            const request = await axios.post('/api/user/follow', {
                userId: userId
            });

            if (request.status == 200) {
                successNotification('User followed')
                mutate();
                mutateTargetUser(userId);
                setLoading(false);
            }
        } catch (error) {
            console.error('FOLLOW_FUNCTION_ERROR', error);
            if (axios.isAxiosError(error) && error.response?.status == 400) {
                errorNotification('You cannot follow yourself')
            }
            else {
                errorNotification('Something went wrong');
            }
        }
        finally {
            setLoading(false);
        }

    }, [currentUser, handleLoginModal, mutate, mutateTargetUser, userId])

    if (isLoading) {
        return <LoadingSpinner spinnerSize={60} />
    }

    return (
        <div
            className='flex flex-col items-start justify-center text-[#343a40]
        p-6 border rounded-lg gap-y-5'
        >
            <Avatar
                isNavigable={false}
                isProfileAvatar
                userId={user?.id}
                profilePicture={user?.profilePicture}
                className='self-center'
            />
            <div className='flex flex-col items-start'>
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
            </div>



            {
                user?.fieldOfStudy && <p className='uppercase font-bold lg:text-lg'>
                    {user?.fieldOfStudy}
                </p>
            }

            {
                user?.tutoringAvailable && (
                    <Link
                        href="/tutor-page"
                        className='flex items-center text-[#1abc9c] gap-x-5'
                    >
                        <span className='lg:text-lg font-bold'>Available for Tutoring</span>
                        {
                            user.tutoringAvailable && <div className='flex items-center gap-x-1'>
                                <FaStar />
                                {
                                    user.tutoringRating == 0 ? (
                                        <span className='text-md lg:text-base text-[#1abc9c/40]'>New</span>
                                    ) : (
                                        <span>
                                            {user?.tutoringRating}
                                        </span>
                                    )
                                }

                            </div>
                        }

                    </Link>
                )
            }
            {
                user?.bio && <p className='lg:text-lg mb-5'>
                    {user?.bio}
                </p>
            }
            {
                currentUser?.id == userId ? (
                    <Button
                        label='Edit Profile'
                        ariaLabel='Edit Profile Button'
                        onClick={handleEditModal.onOpen}
                        className='w-full md:py-3 md:text-base'
                        disabled={loading}
                    />
                ) : (
                    <FollowButton
                        currentUser={currentUser!}
                        targetUser={user!}
                        onClick={handleFollow}
                        loading={loading}
                    />
                )
            }

            <p className='font-bold lg:text-lg'>
                Joined: <span className='font-normal text-sm lg:text-base'>
                    {formattedDate}
                </span>
            </p>

            <hr className='w-full' />

            {
                (user?.facebookProfile || user?.twitterUrl || user?.linkedInProfile) && <SocialMediaLink
                    facebookUrl={user?.facebookProfile}
                    linkedinUrl={user?.linkedInProfile}
                    twitterUrl={user?.twitterUrl}
                />
            }


            <FollowerDetail
                followers={user?.followerIds}
                following={user?.followingIds}
            />


        </div>
    );
};

export default UserSidebar;
