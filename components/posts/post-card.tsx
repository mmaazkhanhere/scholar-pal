/*A react component that creates a UI for post and enables user to interact with
the post in various ways like liking, commenting and viewing post details */

"use client"

import { IPost, IUser } from '@/interface-d'
import React, { useCallback, useMemo, useState } from 'react'
import { formatDistanceToNowStrict, format } from 'date-fns'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import Input from '../input'
import Button from '../button'
import LikeButton from '../like-button'
import Tags from '../tags'
import CommentFeed from './comment-feed'
import Avatar from '../avatar'

import { IoSend } from "react-icons/io5";
import { FaRegCommentAlt } from 'react-icons/fa'


import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'

import useLoginModal from '@/hooks/useLoginModal'
import useComments from '@/hooks/useComments'

import usePosts from '@/hooks/usePosts'


type Props = {
    user: IUser //current user details
    post: IPost //post details
    isPostPage?: boolean //checks if the user is on the post page
}

const PostCard = ({ user, post, isPostPage = false }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    //state variables of the post
    const [comment, setComment] = useState<string>('')

    // state variable to open the comment input field to enter a comment
    const [openComment, setOpenComment] = useState<boolean>(false)
    const [likedBy, setLikedBy] = useState(post.likedBy ?? []);

    const session = useSession(); //get details of current session
    const handleLoginModal = useLoginModal() //custom hook to handle login modal visibility

    const { mutate } = useComments(post.id) /*function to manually refetch comment
    made on a post with id equals to post.id*/

    const { mutate: mutatePost } = usePosts() /*function to manually refetch 
    updated post with the comment made*/

    /*A callback that is called when the user clicks on like button. It checks
    if the current user have already like the post. If they have, it will unlike
    the post; if they have not liked, the post will be liked*/
    const handleLike = useCallback(() => {
        const isLiked = likedBy.includes(user.id);
        if (isLiked) {
            setLikedBy(likedBy.filter(id => id !== user.id));
        } else {
            setLikedBy([...likedBy, user.id]);
        }
    }, [user?.id, likedBy]);


    /*a function that is called when user clicks on comment button. It first
    check if the user is authenticated to make a comment. If not, the login modal
    is opened. If they are authenticated to comment, it changes the opens and
    closes the comment input field */
    const handleOpenComment = () => {
        if (session.status == 'unauthenticated') {
            handleLoginModal.onOpen()
        } else {
            setOpenComment(!openComment)
        }
    }

    /*Function that is called when user makes a comment. It makes a POST HTTP
    request to an endpoint to create a comment and update the current post 
    comment fields. It refetch the update post and comment */
    const handleComment = useCallback(async () => {

        try {

            setIsLoading(true);

            const result = await axios.post('/api/comment', {
                postId: post.id,
                postAuthorId: post.authorId,
                currentUserId: user.id,
                content: comment
            });

            mutate();//refetch the comment made
            mutatePost(); //refetch the newly updated post

            //reset the state variables

            setComment('');
            setOpenComment(false);
            setIsLoading(false);

            if (result.status == 200) {
                //if status of HTTP request is successful, a success notification will be shown
                successNotification('Successful comment')
            }
        } catch (error) {

            console.error('COMMENT_ERROR', error);

            //handling and displaying error notification 
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
    }, [post.id, post.authorId, user?.id, comment, mutate, mutatePost])


    /*A function that calculates the time the post was created and return
    it in a 12 hour format */
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
            w-full p-5 shadow-lg rounded-xl mt-10'
        >
            <div className='flex items-start justify-start gap-x-5'>
                {/*Avatar */}
                <div>
                    <Avatar
                        userId={post.author?.id}
                        profilePicture={post.author?.profilePicture}
                        isPostAvatar
                        isNavigable={true}
                    />
                </div>

                {/*Author name, user name and when the post was created */}
                <div className='flex flex-col items-start'>
                    <div className='flex items-center justify-start gap-x-2'>

                        {/*Author name */}
                        <span
                            className='lg:text-xl font-semibold'
                        >
                            {post.author?.name}
                        </span>

                        {/*Username of post author */}
                        <span className='text-sm lg:text-base text-[#343a40]/60'>
                            @{post.author?.username}
                        </span>
                    </div>

                    {/*Time the post was created */}
                    <span className='text-[#343a40]/60 text-xs lg:text-sm'>
                        {createdAtCalculation}
                    </span>
                </div>
            </div>

            {/*Time when the post was created */}
            <div className='md:text-lg'>
                {post.content}
            </div>

            {/*Tags of the posts */}
            <div className='flex items-center justify-start'>
                <Tags tags={post.tags!} />
            </div>

            {/*Details of comment and likes of the post */}
            <div className='flex justify-start items-center gap-x-5'>

                {/*Number of likes */}
                <p className='lg:text-lg font-semibold'>
                    Likes:&nbsp;<span className='text-sm lg:text-base font-normal'>
                        {likedBy.length}
                    </span>
                </p>

                {/*Number of comments */}
                <p className='lg:text-lg font-semibold'>
                    Comments:&nbsp;<span className='text-sm lg:text-base font-normal'>
                        {post?.comments?.length}
                    </span>
                </p>
            </div>

            {/*Like button and comment button */}
            <div className='flex items-center justify-start gap-x-5'>

                {/*Like button */}
                <LikeButton
                    post={post}
                    user={user}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    handleLike={handleLike}
                />

                {/*Comment button */}
                <button
                    disabled={isLoading}
                    onClick={handleOpenComment}
                    aria-label='Comment Button'
                    title='Comment'
                >
                    <FaRegCommentAlt
                        className='w-5 h-5 hover:text-black/70
                    transition duration-300 cursor-pointer'
                    />
                </button>
            </div>

            {/*Open the input field for comment based on state of the openComment
            state variables */}
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

            {/*If any comment is made, then display them */}
            {
                post?.comments?.length > 0 && (
                    <CommentFeed post={post} isPostPage={isPostPage} />
                )
            }
        </article>
    )
}

export default PostCard