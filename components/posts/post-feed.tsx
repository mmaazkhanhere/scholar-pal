/*A react component that display all the posts using custom hooks for fetching both 
the posts and the current user's information*/

"use client"

import React, { useCallback } from 'react'
import Link from 'next/link'

import PostCard from './post-card'
import LoadingSpinner from '../loading-spinner'

import usePosts from '@/hooks/usePosts'
import useUser from '@/hooks/useUser'

import { IPost } from '@/interface-d'
import useLoginModal from '@/hooks/useLoginModal'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


type Props = {}

const PostFeed = (props: Props) => {

    const { data: posts = [], isLoading } = usePosts()/*custom react hook to
    fetch all the posts */
    const { user } = useUser(); //custom hook to fetch current user

    const handleLoginModal = useLoginModal(); //custom hook to handle login modal visibility
    const session = useSession(); //custom hook to get the current session

    const router = useRouter(); //access the router object

    /*a callback function that checks if the user is authenticated. if not
    it is not, it open the login modal */
    const onClick = useCallback((url: string) => {
        if (session.status === 'unauthenticated') {
            handleLoginModal.onOpen();
        }
        else {
            router.push(url)
        }
    }, [handleLoginModal, router, session.status])

    if (isLoading) {
        //while data is being fetched, display a loading spinner 
        return <LoadingSpinner spinnerSize={70} isLoading={isLoading} />
    }

    return (
        <section className='max-w-4xl w-full'>
            {
                posts.map((post: IPost) => (
                    <div
                        className='cursor-pointer'
                        onClick={() => onClick(`/post/${post.id}?id=${user?.id}`)}
                        key={post.id}
                    >
                        <PostCard
                            user={user!}
                            post={post}
                        />
                    </div>
                ))
            }
        </section>
    )
}

export default PostFeed