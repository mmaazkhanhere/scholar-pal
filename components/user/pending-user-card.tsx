import React from 'react'
import Avatar from '../avatar'
import { IMembership } from '@/interface-d'
import FollowButton from '../follow-button'
import useUser from '@/hooks/useUser'

type Props = {
    userId: string
}

const PendingUserCard = ({ userId }: Props) => {

    const { user } = useUser(userId);

    return (
        <article
            className='flex items-center w-full rounded-xl
        border border-[#343a40]/20 p-2 gap-x-2 lg:gap-x-5 max-w-lg'
        >
            <Avatar
                profilePicture={user?.profilePicture}
                userId={user?.id}
                isSuggestionAvatar
                isNavigable={true}
            />
            <div className='flex items-center w-full '>
                <div className='flex flex-col items-start justify-center w-full'>

                    {/*User name and username */}
                    <div className='lg:flex items-center gap-x-2'>
                        {/*User name */}
                        <p className='text-sm lg:text-lg font-bold'>
                            {user?.name}
                        </p>

                        {/*Username */}
                        <p className='hidden md:block md:text-base text-[#343a40]/60'>
                            @{user?.username}
                        </p>
                    </div>

                    {/*Field of Study */}
                    <p className='text-sm lg:text-base text-[#1abc9c] md:font-medium'>
                        {user?.fieldOfStudy}
                    </p>
                </div>
                <div>
                    <button
                        title='Accept User Request'
                        aria-label='Accept User Request Button'
                        className='hover:bg-[#1abc9c]/70 bg-[#1abc9c] 
                        text-[#fefefe] px-4 py-1 rounded-xl'
                    >
                        Accept
                    </button>
                </div>
            </div>

        </article>
    )
}

export default PendingUserCard