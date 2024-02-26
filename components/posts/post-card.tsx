"use client"

import { IPost, IUser } from '@/interface-d'
import React, { useMemo, useState } from 'react'
import Avatar from '../avatar'
import { formatDistanceToNowStrict, format } from 'date-fns'



import { FaCommentAlt } from 'react-icons/fa'
import Input from '../input'
import Button from '../button'

import { IoSend } from "react-icons/io5";
import LikeButton from '../like-button'
import Tags from '../tags'

type Props = {
    currentUser: IUser
    post: IPost
    userId?: string
}

const PostCard = ({ currentUser, post, userId }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [comment, setComment] = useState<string>('')
    const [openComment, setOpenComment] = useState<boolean>(false)
    const [likedBy, setLikedBy] = useState(post.likedBy ?? []);

    const handleLike = () => {
        const isLiked = likedBy.includes(currentUser.id); // Check if currentUser's ID is in the array
        if (isLiked) {
            setLikedBy(likedBy.filter(id => id !== currentUser.id)); // Remove currentUser's ID
        } else {
            setLikedBy([...likedBy, currentUser.id]); // Add currentUser's ID
        }
    };

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
        <article
            className='flex flex-col items-start justify-center gap-y-5 
            border border-red-500 w-full p-5 shadow-md rounded-xl mt-10'
        >
            <div className='flex items-start justify-start gap-x-5'>
                <div className='block lg:hidden'>
                    <Avatar />
                </div>
                <div className='hidden lg:block'>
                    <Avatar isMedium />
                </div>
                <div className='flex flex-col items-start'>
                    <div className='flex items-center justify-start gap-x-2'>
                        <span
                            className='text-xl font-semibold'
                        >
                            {post.author.name}
                        </span>
                        <span className='text-[#343a40]/60'>
                            @{post.author.username}
                        </span>
                    </div>
                    <span>
                        {createdAtCalculation}
                    </span>
                </div>
            </div>

            <div className='md:text-lg'>
                {post.content}
            </div>

            <div className='flex items-center justify-start'>
                <Tags tags={post.tags!} />
            </div>

            <div className='flex justify-start items-center gap-x-5'>
                <p className='text-lg font-semibold'>
                    Likes:&nbsp;<span className='font-normal'>
                        {likedBy.length}
                    </span></p>
                <p className='text-lg font-semibold'>
                    Comments:&nbsp;<span className='font-normal'>
                        {post?.comments?.length}
                    </span></p>
            </div>

            <div className='flex items-center justify-start gap-x-5'>
                <LikeButton
                    post={post}
                    currentUser={currentUser}
                    setIsLoading={setIsLoading}
                    handleLike={handleLike}
                />
                <div className='flex items-center justify-start gap-x-2'>
                    <FaCommentAlt
                        className='w-5 h-5 hover:text-black/70
                        transition duration-300 cursor-pointer'
                    />
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
        </article>
    )
}

export default PostCard