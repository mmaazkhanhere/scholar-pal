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

    console.log(posts)

    return (
        <div className='mt-40 border border-blue-500'>
            {
                posts.map((post: any) => {
                    <PostCard
                        currentUser={currentUser}
                        key={post.id}
                        post={post}
                    />
                })
            }
        </div>
    )
}

export default PostFeed