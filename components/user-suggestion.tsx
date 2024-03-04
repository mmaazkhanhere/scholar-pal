/*A react component that is designed to provide users with suggestions on who to 
follow */

"use client"

import React from 'react'

import useUser from '@/hooks/useUser'
import useUsers from '@/hooks/useUsers'
import UserSuggestionCard from './user-suggestion-card'



type Props = {}

const UserSuggestion = (props: Props) => {

    const { user: currentUser } = useUser()//custom react hook to fetch the current user

    const { data: suggestUsers, isLoading } = useUsers(currentUser?.id) /*custom
    react hook to fetch suggested user based on the current user id */

    if (isLoading) {
        {/*While data is being fetched */ }
        return (
            <h3 className='text-center font-semibold lg:text-2xl'>Who to Follow</h3>
        );
    }

    return (
        <section
            className='flex flex-col items-center border border-[#343a40]/40
        rounded-lg p-5 fixed w-full lg:max-w-[410px]'
        >
            {/*Heading */}
            <h2 className='text-center font-semibold lg:text-2xl'>
                Who to Follow
            </h2>

            {/*Suggested users mapped */}
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