/*A react component to display all the post made by a user to whom profile the user
has navigated */

"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import PostCard from '../posts/post-card'
import LoadingSpinner from '../loading-spinner'

import useUser from '@/hooks/useUser'
import usePosts from '@/hooks/usePosts'

import { IPost } from '@/interface-d'


type Props = {}

const UserPosts = (props: Props) => {

    const userId = usePathname().split('/').pop(); /*get the user id of the user
    whose posts are to be displayed
     */
    const { data: posts, isLoading } = usePosts(userId) /*custom hook to fetch
    all the post of that specific user */

    const { user: currentUser } = useUser(); //custom hook to fetch the current user

    if (isLoading || !currentUser) {
        return <LoadingSpinner spinnerSize={75} />
    }

    return (
        <div className='max-w-4xl w-full'>
            {
                posts?.map((post: IPost) => (
                    <Link
                        href={`/post/${post.id}`}
                        key={post.id}
                    >
                        <PostCard
                            user={currentUser!}
                            post={post}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default UserPosts