"use client"

import React from 'react'

import useUser from '@/hooks/useUser'
import useUsers from '@/hooks/useUsers'
import UserSuggestionCard from './user-suggestion-card'



type Props = {}

const UserSuggestion = (props: Props) => {

    const { user: currentUser } = useUser()
    const { data: suggestUsers, isLoading } = useUsers(currentUser?.id)

    if (isLoading) {
        return (
            <h3 className='text-center font-semibold lg:text-2xl'>Who to Follow</h3>
        );
    }

    return (
        <section
            className='flex flex-col items-center border border-[#343a40]/40
        rounded-lg p-5 fixed w-full max-w-[440px]'
        >
            <h2 className='text-center font-semibold lg:text-2xl'>
                Who to Follow
            </h2>
            <div
                className='flex flex-col items-center gap-y-2 
                self-start mt-5 max-w-[360px] w-full'
            >
                {
                    suggestUsers?.map((suggestUser) => (
                        <UserSuggestionCard
                            key={suggestUser.id}
                            suggestUser={suggestUser}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default UserSuggestion