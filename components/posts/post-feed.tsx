"use client"
import usePosts from '@/hooks/usePosts'
import React, { useState } from 'react'
import PostCard from './post-card'
import { IUser } from '@/interface-d'

type Props = {
    currentUser: IUser
}

const PostFeed = ({ currentUser }: Props) => {
    const { data: posts = [] } = usePosts()

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
