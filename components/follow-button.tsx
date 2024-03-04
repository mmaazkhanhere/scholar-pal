/*A react follow/unfollow button component */

import { IUser } from '@/interface-d'
import React from 'react'
import Button from './button'

type Props = {
    currentUser?: IUser, //current user details
    targetUser?: IUser, //the user to follow/unfollow details
    loading?: boolean, //loading state of the component
    onClick: () => void, // function to be called when the component is clicked
    className?: string //custom classes
}

const FollowButton = ({ currentUser, targetUser, loading, onClick, className }: Props) => {

    const isFollowing = targetUser?.followerIds?.includes(currentUser?.id as string);

    return (
        <div className='w-full'>
            {/*If the current user already follows the target user, then display
            an unfollow button. Else display a follow button */}
            {
                isFollowing ? (
                    <Button
                        label='Unfollow'
                        ariaLabel='Unfollow Button'
                        onClick={onClick}
                        className={`${className} w-full md:py-2.5 md:text-base`}
                        disabled={loading}
                    />
                ) : (
                    <Button
                        label='Follow'
                        ariaLabel='Follow Button'
                        onClick={onClick}
                        className={`${className} w-full md:py-2.5 md:text-base`}
                        disabled={loading}
                    />
                )
            }
        </div>
    )
}

export default FollowButton