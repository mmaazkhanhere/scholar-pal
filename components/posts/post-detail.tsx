"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import LoadingSpinner from '../loading-spinner'
import PostCard from './post-card'

import useUser from '@/hooks/useUser'
import usePost from '@/hooks/usePost'


type Props = {}

const PostDetail = (props: Props) => {

    const postId = usePathname().split('/').pop() //get id of the post from the url
    const userId = useSearchParams().get('id') //get the user id as passed in url query

    const { data: post, isLoading } = usePost(postId) /*custom hook to fetch a 
    specific post with the id same as postId passed in the url */

    const { user } = useUser(userId!) /*custom hook to fetch specific user with
    id same as userId passed in the url query */

    if (isLoading || !user) {
        //while the data are being fetched, display a loading spinner
        return <LoadingSpinner spinnerSize={75} />
    }

    return (
        <div className='max-w-4xl w-full'>
            <PostCard
                post={post}
                user={user}
                isPostPage={true}
            />
        </div>
    )
}

export default PostDetail