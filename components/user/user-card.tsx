import React from 'react'
import Avatar from '../avatar'
import { IUser } from '@/interface-d'
import Button from '../button'
import FollowButton from '../follow-button'

type Props = {
    user: IUser
}

const UserCard = ({ user }: Props) => {
    return (
        <article
            className='flex items-center max-w-80 w-full rounded-xl
        border border-[#343a40]/20'
        >
            <Avatar
                profilePicture={user.profilePicture}
                userId={user.id}
                isHeaderAvatar
                isNavigable={true}
            />
            <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col items-start justify-center gap-y-1'>
                    <div className='flex items-center gap-x-2'>
                        <p>{user.name}</p>
                        <p>@{user.username}</p>
                    </div>
                    <p>
                        {user.fieldOfStudy}
                    </p>
                </div>
                <FollowButton
                    onClick={() => console.log('')}
                />
            </div>
        </article>
    )
}

export default UserCard