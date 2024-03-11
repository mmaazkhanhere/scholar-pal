/*A react component to display all the post made by a user to whom profile the user
has navigated */

"use client"

import React, { useEffect } from 'react'
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
        <section className='max-w-4xl w-full'>
            {
                posts.length == 0 ? (
                    <div className='mt-10 flex justify-center text-xl lg:text-2xl font-medium'>
                        No posts available
                    </div>
                ) : (
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
                )
            }
        </section>
    )
}

export default UserPosts