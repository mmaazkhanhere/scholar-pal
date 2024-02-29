"use client"

import React from 'react'

import NewPost from '../posts/new-post'
import UserPosts from './user-posts'
import useUser from '@/hooks/useUser'
import { usePathname } from 'next/navigation'

type Props = {}

const UserPostBar = (props: Props) => {

    const { user } = useUser()
    const userId = usePathname().split('/').pop()

    return (
        <div className='flex flex-col lg:col-span-5 w-full px-2 lg:px-20'>
            <div className='pt-5 lg:pt-0'>
                {
                    userId == user?.id && <NewPost />
                }
            </div>


            <UserPosts />
        </div>
    )
}

export default UserPostBar