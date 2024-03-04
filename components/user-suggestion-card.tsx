/*A react component designed to display a suggestion for user and showcase
basic information about a suggested user, including their avatar, name, field
of study and user name */

import Link from 'next/link'

import React from 'react'
import Avatar from './avatar'

import { IUser } from '@/interface-d'

type Props = {
    suggestUser: IUser
}

const UserSuggestionCard = ({ suggestUser }: Props) => {

    if (!suggestUser) {
        return null;
    }

    return (
        <Link
            href={`/user/${suggestUser.id}`}
            className='flex flex-col items-start p-2 w-full'
        >
            <div className='flex items-start justify-start gap-x-4'>
                {/*Avatar */}
                <div>
                    <Avatar
                        isNavigable={false}
                        isSuggestionAvatar
                        userId={suggestUser.id}
                        profilePicture={suggestUser.profilePicture}
                    />
                </div>

                <div className='flex flex-col items-start'>
                    <div className='flex items-center gap-x-2'>

                        {/*Suggested User name */}
                        <p className='lg:text-lg font-bold'>
                            {suggestUser.name}
                        </p>

                        {/*Suggested User field of study */}
                        <span
                            className='text-sm lg:text-base text-[#1abc9c] 
                            font-medium'
                        >
                            {suggestUser.fieldOfStudy}
                        </span>
                    </div>

                    {/*username of the suggested user */}
                    <p className='text-sm lg:text-base text-[#343a40]/60 font-medium'>
                        @{suggestUser.username}
                    </p>
                </div>
            </div>

        </Link>
    )
}

export default UserSuggestionCard