/*A react component that display all the posts using custom hooks for fetching both 
the posts and the current user's information*/

"use client"

import React from 'react'
import Link from 'next/link'

import PostCard from './post-card'
import LoadingSpinner from '../loading-spinner'

import usePosts from '@/hooks/usePosts'
import useUser from '@/hooks/useUser'

import { IPost } from '@/interface-d'


type Props = {}

const PostFeed = (props: Props) => {

    const { data: posts = [], isLoading } = usePosts()/*custom react hook to
    fetch all the posts */
    const { user } = useUser(); //custom hook to fetch current user

    if (isLoading || !user) {
        //while data is being fetched, display a loading spinner 
        return <LoadingSpinner spinnerSize={70} isLoading={isLoading} />
    }

    return (
        <section className='max-w-4xl w-full'>
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