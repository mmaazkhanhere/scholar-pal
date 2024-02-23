"use client"

import useLoginModal from '@/hooks/useLoginModal'
import { IPost, IUser } from '@/interface-d'
import React, { useMemo } from 'react'
import Avatar from '../avatar'
import { formatDistanceToNowStrict } from 'date-fns'


type Props = {
    currentUser: IUser
    post: IPost
    userId?: string
}

const PostCard = ({ currentUser, post, userId }: Props) => {

    const handleLoginModal = useLoginModal()

    const createdAtCalculation = useMemo(() => {
        if (!post.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(post.createdAt))
    }, [post.createdAt])

    return (
        <div className='flex flex-col items-start justify-center gap-y-5 border border-red-500'>
            <div className='flex items-start justify-start'>
                <div className='block lg:hidden'>
                    <Avatar />
                </div>
                <div className='hidden lg:block'>
                    <Avatar />
                </div>
                <div className='flex flex-col items-start'>
                    <div className='flex items-start justify-start gap-x-4'>
                        <span>{post.author.name}</span>
                        <span>@{post.author.username}</span>
                    </div>
                    <span>{createdAtCalculation}</span>
                </div>
            </div>

            <div>
                {post.content}
            </div>

            <div>

            </div>
        </div>
    )
}

export default PostCard