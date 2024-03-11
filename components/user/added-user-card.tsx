import React from 'react'
import Avatar from '../avatar'
import { IMembership } from '@/interface-d'
import FollowButton from '../follow-button'

type Props = {
    member: IMembership
}

const AddedUserCard = ({ member }: Props) => {

    return (
        <article
            className='flex items-center w-full rounded-xl
        border border-[#343a40]/20 p-2 gap-x-2 lg:gap-x-5 max-w-lg'
        >
            <Avatar
                profilePicture={member.user?.profilePicture}
                userId={member.user?.id}
                isSuggestionAvatar
                isNavigable={true}
            />
            <div className='flex items-center w-full '>
                <div className='flex flex-col items-start justify-center w-full'>

                    {/*User name and username */}
                    <div className='lg:flex items-center gap-x-2'>
                        {/*User name */}
                        <p className='text-sm lg:text-lg font-bold'>
                            {member.user?.name}
                        </p>

                        {/*Username */}
                        <p className='hidden md:block md:text-base text-[#343a40]/60'>
                            @{member.user?.username}
                        </p>
                    </div>

                    {/*Field of Study */}
                    <p className='text-sm lg:text-base text-[#1abc9c] md:font-medium'>
                        {member.user?.fieldOfStudy}
                    </p>
                </div>
                <div >
                    <FollowButton
                        targetUserId={member.user.id}
                        className='w-16 md:w-20 lg:w-24 text-xs lg:text-sm'
                    />
                </div>
            </div>

        </article>
    )
}

export default AddedUserCard