"use client"
import usePosts from '@/hooks/usePosts'
import React, { useState } from 'react'
import PostCard from './post-card'
import useUser from '@/hooks/useUser'

type Props = {}

const PostFeed = (props: Props) => {
    const { data: posts = [] } = usePosts()
    const { user: currentUser } = useUser();

    console.log(currentUser)
    return (
        <section className='max-w-3xl w-full'>
            {
                posts.map((post: any) => (
                    <PostCard
                        currentUser={currentUser!}
                        key={post.id}
                        post={post}
                    />
                ))
            }
        </section>
    )
}

export default PostFeed
