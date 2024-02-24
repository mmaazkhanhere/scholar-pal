"use client"

import { IPost, IUser } from '@/interface-d'
import React, { useMemo, useState } from 'react'
import Avatar from '../avatar'
import { formatDistanceToNowStrict, format } from 'date-fns'


import { GoHeart, GoHeartFill } from 'react-icons/go'
import { FaCommentAlt } from 'react-icons/fa'
import Input from '../input'
import Button from '../button'

import { IoSend } from "react-icons/io5";

type Props = {
    currentUser: IUser
    post: IPost
    userId?: string
}

const PostCard = ({ currentUser, post, userId }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [comment, setComment] = useState<string>('')
    const [openComment, setOpenComment] = useState<boolean>(false)

    const createdAtCalculation = useMemo(() => {
        if (!post.createdAt) {
            return null;
        }
        // Formats the date to show the time in 12-hour format with AM/PM
        const timeString = format(new Date(post.createdAt), 'hh:mm a');
        const relativeTimeString = formatDistanceToNowStrict(new Date(post.createdAt));
        return `${timeString}, ${relativeTimeString} ago`;
    }, [post.createdAt]);


    return (
        <div
            className='flex flex-col items-start justify-center gap-y-5 
        border border-red-500 w-full'
        >
            <div className='flex items-start justify-start'>
                <div className='block lg:hidden'>
                    <Avatar />
                </div>
                <div className='hidden lg:block'>
                    <Avatar isMedium />
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
            <hr />
            <div className='flex justify-start items-center'>
                <p>Likes: <span>{post.likedBy?.length}</span></p>
                <p>Comments: <span>{post?.comments?.length}</span></p>
            </div>
            <hr />
            <div className='flex items-center justify-start gap-x-5'>

                {
                    post?.likedBy?.includes(currentUser?.id) ?
                        <GoHeartFill className='bg-red-500' /> :
                        <GoHeart />
                }
                <div className='flex items-center justify-start gap-x-2'>
                    <FaCommentAlt />
                </div>
            </div>
            {
                openComment && (
                    <div className='flex items-center justify-start w-full gap-x-4'>
                        <Input
                            placeholder='Comment'
                            value={comment}
                            onChange={(event: any) => setComment(event.target.value)}
                            disabled={isLoading}
                        />
                        <Button
                            disabled={isLoading}
                            ariaLabel='Comment Button'
                            icon={<IoSend className='w-5 h-5 fill-white' />}
                            onClick={() => console.log('')}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default PostCard