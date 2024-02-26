import { IComment } from '@/interface-d'
import React, { useMemo } from 'react'
import Avatar from '../avatar'
import { formatDistanceToNowStrict } from 'date-fns'

type Props = {
    comment: IComment
}

const CommentCard = ({ comment }: Props) => {

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
            <div>
                <Avatar isHeaderAvatar />
            </div>
            <div className='flex flex-col items-start'>
                <div className='flex items-center justify-start gap-x-2'>
                    <p className='lg:text-lg font-semibold'>
                        {comment.author?.name}
                    </p>

                    <p className='text-sm text-[#343a40]/60'>
                        @{comment.author?.username}
                    </p>
                    <p className='text-sm text-[#343a40]/60'>
                        {calculateCreatedTime}
                    </p>
                </div>
                <p className='text-sm'>
                    {comment?.content}
                </p>
            </div>
        </article>
    )
}

export default CommentCard