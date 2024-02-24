"use client"
import usePosts from '@/hooks/usePosts'
import React from 'react'
import PostCard from './post-card'
import { IUser } from '@/interface-d'

type Props = {
    currentUser: IUser
}

const PostFeed = ({ currentUser }: Props) => {
    const { data: posts = [] } = usePosts()

    return (
        <div className='mt-10 max-w-2xl w-full'>
            {
                posts.map((post: any) => (
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

export default PostFeed
