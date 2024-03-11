/*A react follow/unfollow button component */

"use client"

import React, { useCallback, useState } from 'react'
import Button from './button'
import useLoginModal from '@/hooks/useLoginModal'
import axios from 'axios'
import { successNotification } from '@/helpers/success-notification'

import useUser from '@/hooks/useUser'
import { errorNotification } from '@/helpers/error-notification'
import { useSession } from 'next-auth/react'

type Props = {
    targetUserId?: string;
    className?: string //custom classes
}

const FollowButton = ({ className, targetUserId }: Props) => {

    const [loading, setLoading] = useState<boolean>(false)

    const { onOpen: openLoginModal } = useLoginModal();
    const { user: currentUser, mutate } = useUser();
    const { status } = useSession();
    const { user: targetUser, mutate: mutateTargetUser } = useUser(targetUserId);

    /*A function that is called when user clicks on follow button. It makes a
    POST HTTP request to specified api endpoint passing the userId in the
    body. If the response status is 200 (successful), a success notification
    is displayed. An updated users are fetched. */
    const handleFollow = useCallback(async () => {
        try {

            setLoading(true);

            if (status == 'unauthenticated') {
                openLoginModal();
            };

            const request = await axios.post('/api/user/follow', {
                userId: targetUser?.id as string
            });

            if (request.status == 200) {
                successNotification('User followed')
                mutate(); //fetch the updated current user
                mutateTargetUser(targetUserId); //fetch the updated target user
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

    }, [mutate, mutateTargetUser, openLoginModal, status, targetUser?.id, targetUserId])

    const isFollowing = targetUser?.followerIds?.includes(currentUser?.id as string);

    return (
        <div className='w-full'>
            {/*If the current user already follows the target user, then display
            an unfollow button. Else display a follow button */}
            {
                currentUser?.id != targetUser?.id && (
                    isFollowing ? (
                        <Button
                            label='Unfollow'
                            ariaLabel='Unfollow Button'
                            onClick={handleFollow}
                            className={`${className} w-full bg-red-500 text-[#fefefe] 
                        hover:bg-red-400 md:py-2.5 md:text-base`}
                            disabled={loading}
                        />
                    ) : (
                        <Button
                            label='Follow'
                            ariaLabel='Follow Button'
                            onClick={handleFollow}
                            className={`${className} w-full md:py-2.5 md:text-base`}
                            disabled={loading}
                        />
                    )
                )

            }
        </div>
    )
}

export default FollowButton