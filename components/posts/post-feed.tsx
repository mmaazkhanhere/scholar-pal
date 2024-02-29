"use client"

import React from 'react'

import PostCard from './post-card'

import usePosts from '@/hooks/usePosts'
import useUser from '@/hooks/useUser'
import LoadingSpinner from '../loading-spinner'

type Props = {}

const PostFeed = (props: Props) => {
    const { data: posts = [], isLoading } = usePosts()
    const { user: currentUser } = useUser();

    if (isLoading || !currentUser) {
        return <LoadingSpinner spinnerSize={70} isLoading={isLoading} />
    }

    return (
        <section className='max-w-3xl w-full'>
            {
                posts.map((post: any) => (
                    <PostCard
                        currentUser={currentUser}
                        key={post.id}
                        post={post}
                    />
                ))
            }
        </section>
    )
}

export default PostFeed
