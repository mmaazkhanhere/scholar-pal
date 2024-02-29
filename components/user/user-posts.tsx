"use client"

import React from 'react'
import usePosts from '@/hooks/usePosts'
import { usePathname } from 'next/navigation'
import PostCard from '../posts/post-card'

import { IPost } from '@/interface-d'
import useUser from '@/hooks/useUser'
import LoadingSpinner from '../loading-spinner'

type Props = {}

const UserPosts = (props: Props) => {

    const userId = usePathname().split('/').pop();
    const { data: posts, isLoading } = usePosts(userId)
    const { user: currentUser } = useUser();

    if (isLoading || !currentUser) {
        return <LoadingSpinner spinnerSize={75} />
    }

    return (
        <div className='max-w-4xl w-full'>
            {
                posts?.map((post: IPost) => (
                    <PostCard
                        currentUser={currentUser}
                        key={post.id}
                        post={post}
                    />
                ))
            }
        </div>
    )
}

export default UserPosts