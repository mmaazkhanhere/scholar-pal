"use client"

import React from 'react'

import PostCard from './post-card'
import LoadingSpinner from '../loading-spinner'

import usePosts from '@/hooks/usePosts'
import useUser from '@/hooks/useUser'
import Link from 'next/link'
import { IPost } from '@/interface-d'


type Props = {}

const PostFeed = (props: Props) => {
    const { data: posts = [], isLoading } = usePosts()
    const { user } = useUser();

    if (isLoading || !user) {
        return <LoadingSpinner spinnerSize={70} isLoading={isLoading} />
    }

    return (
        <section className='max-w-3xl w-full'>
            {
                posts.map((post: IPost) => (
                    <Link
                        key={post.id}
                        href={`/post/${post.id}?id=${user.id}`}
                    >
                        <PostCard
                            user={user}
                            post={post}
                        />
                    </Link>
                ))
            }
        </section>
    )
}

export default PostFeed
