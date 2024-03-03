import { IUser } from '@/interface-d'
import React from 'react'
import Button from './button'

type Props = {
    currentUser?: IUser,
    targetUser?: IUser,
    loading?: boolean,
    onClick: () => void,
    className?: string
}

const FollowButton = ({ currentUser, targetUser, loading, onClick, className }: Props) => {
    return (
        <div className='w-full'>
            {
                targetUser?.followerIds?.includes(currentUser?.id as string) ? (
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