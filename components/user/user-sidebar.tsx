/* The UserSidebar component is a React component designed to display detailed 
information about a user in a sidebar format. It includes the user's avatar, 
name, social media links, tutoring availability, bio, join date, and options to 
edit the profile or follow the user, depending on whether the viewer is the 
profile owner or another user.*/

"use client"

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';
import axios from 'axios';

import FollowerDetail from './follower-detail';

import Button from '../button';
import SocialMediaLink from './social-media-link';
import Avatar from '../avatar';
import LoadingSpinner from '../loading-spinner';
import FollowButton from '../follow-button';

import { FaMedal, FaStar } from "react-icons/fa";

import useUser from '@/hooks/useUser';
import useEditModal from '@/hooks/useEditModal';
import useLoginModal from '@/hooks/useLoginModal';

import { successNotification } from '@/helpers/success-notification';
import { errorNotification } from '@/helpers/error-notification';


const UserSidebar = () => {

    const [loading, setLoading] = useState(false);

    const userId = usePathname().split('/').pop(); /*user id extract from the url */

    const { user: currentUser, isLoading, mutate } = useUser(); /*custom react
    hook to fetch the current user */
    const { user, mutate: mutateTargetUser } = useUser(userId); /*custom react
    hook to fetch detail of the user whose profile the user has navigated to */

    const handleEditModal = useEditModal() //custom hook to handle edit modal visibility
    const handleLoginModal = useLoginModal(); //custom hook to handle login modal visibility

    const formattedDate = user?.createdAt ? format(new Date(user.createdAt), 'PPP') : '';
    //format the date when the user was created

    /*A function that is called when user clicks on follow button. It makes a
    POST HTTP request to specified api endpoint passing the userId in the
    body. If the response status is 200 (successful), a success notification
    is displayed. An updated users are fetched. */
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
                mutate(); //fetch the updated current user
                mutateTargetUser(userId); //fetch the updated target user
                setLoading(false);
            }
        } catch (error) {

            console.error('FOLLOW_FUNCTION_ERROR', error);

            /*handling potential errors and displaying error notifications */
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

    //display a loading spinner while the data is being fetched
    if (isLoading || !user) {
        return <LoadingSpinner spinnerSize={60} />
    }

    return (
        <div
            className='flex flex-col items-start justify-center text-[#343a40]
        p-6 border rounded-lg gap-y-5'
        >
            {/*Avatar */}
            <Avatar
                isNavigable={false}
                isProfileAvatar
                userId={user?.id}
                profilePicture={user?.profilePicture}
                className='self-center'
            />

            {/*User details */}
            <div className='flex flex-col items-start'>
                <div className='flex items-end gap-x-5 mt-5'>

                    {/*User name */}
                    <h3 className='text-2xl lg:text-4xl font-bold '>
                        {user?.name}
                    </h3>

                    {/*User score */}
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

                    {/*User userna,e */}
                    <p className='font-semibold'>
                        @{user?.username}
                    </p>

                    {/*User age which is displayed only if it mentioned */}
                    {
                        user?.age && <span >{user?.age} years old</span>
                    }
                </div>
            </div>

            {/*Field of study the user belongs to and displayed only if available */}
            {
                user?.fieldOfStudy && <p className='uppercase font-bold lg:text-lg'>
                    {user?.fieldOfStudy}
                </p>
            }

            {/*User availability for tutoring */}
            {
                user?.tutoringAvailable && (
                    <Link
                        href="/tutor-page"
                        className='flex items-center text-[#1abc9c] gap-x-5'
                    >
                        <span className='lg:text-lg font-bold'>Available for Tutoring</span>

                        {/*User rating. If it is 0 then display new text else
                        display rating */}
                        {
                            user.tutoringAvailable && <div className='flex items-center gap-x-1'>
                                <FaStar />
                                {
                                    user.tutoringRating == 0 ? (
                                        <span className='text-md lg:text-base text-[#1abc9c/40]'>
                                            New
                                        </span>
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

            {/*User short description */}
            {
                user?.bio && <p className='lg:text-lg mb-5'>
                    {user?.bio}
                </p>
            }

            {/*An edit button is displayed if user navigates to his/herp profile
            page else a following/unfollow button is displayed */}
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

            {/*Date joined */}
            <p className='font-bold lg:text-lg'>
                Joined: <span className='font-normal text-sm lg:text-base'>
                    {formattedDate}
                </span>
            </p>

            {/*Break line */}
            <hr className='w-full' />

            {/*Displaying user social media profile icons */}
            {
                (user?.facebookProfile || user?.twitterUrl || user?.linkedInProfile) && <SocialMediaLink
                    facebookUrl={user?.facebookProfile}
                    linkedinUrl={user?.linkedInProfile}
                    twitterUrl={user?.twitterUrl}
                />
            }

            {/*User follower and following details */}
            <FollowerDetail
                followers={user?.followerIds}
                following={user?.followingIds}
            />

        </div>
    );
};

export default UserSidebar;
