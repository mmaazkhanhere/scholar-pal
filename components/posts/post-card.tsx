"use client"

import { IPost, IUser } from '@/interface-d'
import React, { useCallback, useMemo, useState } from 'react'
import Avatar from '../avatar'
import { formatDistanceToNowStrict, format } from 'date-fns'

import Input from '../input'
import Button from '../button'
import LikeButton from '../like-button'
import Tags from '../tags'

import { IoSend } from "react-icons/io5";
import { FaRegCommentAlt } from 'react-icons/fa'
import CommentFeed from './comment-feed'
import axios from 'axios'
import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'
import useLoginModal from '@/hooks/useLoginModal'
import { useSession } from 'next-auth/react'
import useComments from '@/hooks/useComments'


type Props = {
    currentUser: IUser
    post: IPost
}

const PostCard = ({ currentUser, post }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('')
    const [openComment, setOpenComment] = useState<boolean>(false)
    const [likedBy, setLikedBy] = useState(post.likedBy ?? []);

    const session = useSession();
    const handleLoginModal = useLoginModal()

    const { mutate } = useComments(post.id)

    const handleLike = useCallback(() => {
        const isLiked = likedBy.includes(currentUser.id);
        if (isLiked) {
            setLikedBy(likedBy.filter(id => id !== currentUser.id));
        } else {
            setLikedBy([...likedBy, currentUser.id]);
        }
    }, [currentUser?.id, likedBy]);

    const handleOpenComment = () => {
        if (session.status == 'unauthenticated') {
            handleLoginModal.onOpen()
        } else {
            setOpenComment(!openComment)
        }
    }

    const handleComment = useCallback(async () => {

        try {

            setIsLoading(true);
            const result = await axios.post('/api/comment', {
                postId: post.id,
                currentUser: currentUser.id,
                content: comment
            });
            mutate();
            setComment('');
            setOpenComment(false);
            setIsLoading(false);
            if (result.status == 200) {
                successNotification('Successful comment')
            }
        } catch (error) {
            console.error('COMMENT_ERROR', error);
            if (axios.isAxiosError(error) && error.response?.status == 404) {
                errorNotification('Unable to comment')
            }
            else {
                errorNotification('Something went wrong')
            }
        }
        finally {
            setIsLoading(false)
        }
    }, [comment, currentUser?.id, mutate, post.id])

    const createdAtCalculation = useMemo(() => {
        if (!post.createdAt) {
            return null;
        }
        // Formats the date to show the time in 12-hour format with AM/PM
        const timeString = format(new Date(post.createdAt), 'hh:mm a');
        const relativeTimeString = formatDistanceToNowStrict(new Date(post.createdAt));
        return `${timeString}, ${relativeTimeString} ago`;
    }, [post.createdAt]);

    console.log(post.comments[0])

    return (
        <article
            className='flex flex-col items-start justify-center gap-y-5 
            w-full p-5 shadow-lg rounded-xl mt-10'
        >
            <div className='flex items-start justify-start gap-x-5'>
                <div>
                    <Avatar isPostAvatar />
                </div>
                <div className='flex flex-col items-start'>
                    <div className='flex items-center justify-start gap-x-2'>
                        <span
                            className='lg:text-xl font-semibold'
                        >
                            {post.author.name}
                        </span>
                        <span className='text-sm lg:text-base text-[#343a40]/60'>
                            @{post.author.username}
                        </span>
                    </div>
                    <span className='text-[#343a40]/60 text-xs lg:text-sm'>
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
                <p className='lg:text-lg font-semibold'>
                    Likes:&nbsp;<span className='text-sm lg:text-base font-normal'>
                        {likedBy.length}
                    </span></p>
                <p className='lg:text-lg font-semibold'>
                    Comments:&nbsp;<span className='text-sm lg:text-base font-normal'>
                        {post?.comments?.length}
                    </span></p>
            </div>

            <div className='flex items-center justify-start gap-x-5'>
                <LikeButton
                    post={post}
                    currentUser={currentUser}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    handleLike={handleLike}
                />
                <button
                    disabled={isLoading}
                    onClick={handleOpenComment}
                    aria-label='Comment Button'
                >
                    <FaRegCommentAlt
                        className='w-5 h-5 hover:text-black/70
                    transition duration-300 cursor-pointer'
                    />
                </button>
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
                            onClick={handleComment}
                        />
                    </div>
                )
            }
            {
                post?.comments.length > 0 && (
                    <CommentFeed post={post} />
                )
            }
        </article>
    )
}

export default PostCard