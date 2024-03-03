/*A react component card that display a comment made on a post */

import React, { useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

import Avatar from '../avatar'

import { IComment } from '@/interface-d'


type Props = {
    comment: IComment
}

const CommentCard = ({ comment }: Props) => {

    /*A function that calculates the time when the comment was created and 
    and display it in a specific format*/
    const calculateCreatedTime = useMemo(() => {
        if (!comment.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(comment.createdAt));
    }, [comment.createdAt])

    return (
        <article
            className='flex items-start justify-start gap-x-4 w-full
            border-b border-b-[#343a40]/20 py-2'
        >
            {/*Avatar of user who made the comment */}
            <div>
                <Avatar
                    profilePicture={comment.author.profilePicture}
                    isHeaderAvatar
                />
            </div>

            {/*Name, username of the user who made it and content of the comment */}
            <div className='flex flex-col items-start'>
                <div className='flex items-center justify-start gap-x-1 lg:gap-x-2'>
                    {/*Author name */}
                    <p className='lg:text-lg font-semibold'>
                        {comment.author?.name}
                    </p>

                    {/*Author username */}
                    <p className='text-sm text-[#343a40]/60'>
                        @{comment.author?.username}
                    </p>

                    {/*The time comment was made */}
                    <p className='hidden lg:block text-sm text-[#343a40]/60'>
                        {calculateCreatedTime} ago
                    </p>
                </div>

                {/*content of the comment */}
                <p className='text-sm'>
                    {comment?.content}
                </p>
            </div>
        </article>
    )
}

export default CommentCard