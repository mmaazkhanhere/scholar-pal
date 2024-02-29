"use client"

import React from 'react'
import usePosts from '@/hooks/usePosts'
import { usePathname } from 'next/navigation'
import PostCard from '../posts/post-card'

import { IPost } from '@/interface-d'
import useUser from '@/hooks/useUser'
import LoadingSpinner from '../loading-spinner'
import Link from 'next/link'

type Props = {}

const UserPosts = (props: Props) => {

    const userId = usePathname().split('/').pop();
    const { data: posts, isLoading } = usePosts(userId)
    const { user } = useUser();

    if (isLoading || !user) {
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
                            user={user}
                            post={post}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default UserPosts