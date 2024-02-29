"use client"
import usePost from '@/hooks/usePost'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import LoadingSpinner from '../loading-spinner'
import PostCard from './post-card'
import useUser from '@/hooks/useUser'


type Props = {}

const PostDetail = (props: Props) => {

    const postId = usePathname().split('/').pop()
    const userId = useSearchParams().get('id')

    const { data: post, isLoading } = usePost(postId)
    const { user } = useUser(userId!)

    if (isLoading || !user) {
        return <LoadingSpinner spinnerSize={75} />
    }

    return (
        <div className='max-w-4xl w-full'>
            <PostCard
                post={post}
                user={user}
            />
        </div>
    )
}

export default PostDetail