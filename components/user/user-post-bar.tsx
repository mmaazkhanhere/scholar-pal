/*React component for user profile page to allow user to make a new post. */

"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

import NewPostButton from '../posts/new-post-button'

import UserPosts from './user-posts'
import useUser from '@/hooks/useUser'

type Props = {}

const UserPostBar = (props: Props) => {

    const { user } = useUser() //custom hook to fetch the current user
    const userId = usePathname().split('/').pop() /*get the id of the user to whose
    profile we have navigated to */

    return (
        <section className='flex flex-col lg:col-span-5 w-full px-2 lg:px-20'>
            <div className='pt-5 lg:pt-0'>
                {/*If the profile page user has navigated is same as the user
                currently signed in, only then display the new post button */}
                {
                    userId == user?.id && <NewPostButton />
                }
            </div>
            <UserPosts />
        </section>
    )
}

export default UserPostBar