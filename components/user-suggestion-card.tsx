
import Link from 'next/link'
import React from 'react'
import Avatar from './avatar'
import { IUser } from '@/interface-d'

type Props = {
    suggestUser: IUser
}

const UserSuggestionCard = ({ suggestUser }: Props) => {

    return (
        <Link
            href={`/user/${suggestUser.id}`}
            className='flex flex-col items-start p-2 w-full'
        >
            <div className='flex items-start justify-start gap-x-4'>
                <div>
                    <Avatar
                        isNavigable={false}
                        isSuggestionAvatar
                        userId={suggestUser?.id}
                        profilePicture={suggestUser?.profilePicture}
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <div className='flex items-center gap-x-2'>
                        <p className='lg:text-lg font-bold'>
                            {suggestUser?.name}
                        </p>
                        <span
                            className='text-sm lg:text-base text-[#1abc9c] 
                            font-medium'
                        >
                            {suggestUser?.fieldOfStudy}
                        </span>
                    </div>
                    <p className='text-sm lg:text-base text-[#343a40]/60 font-medium'>
                        @{suggestUser?.username}
                    </p>
                </div>
            </div>

        </Link>
    )
}

export default UserSuggestionCard