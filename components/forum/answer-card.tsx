"use client"

import { IAnswer } from '@/interface-d'
import React, { useMemo } from 'react'
import Avatar from '../avatar'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { markdownToHtml } from '@/libs/showdown'
import ForumButton from './forum-buttons'

type Props = {
    answer: IAnswer
}

const AnswerCard = ({ answer }: Props) => {

    const createdAtCalculation = useMemo(() => {
        if (!answer?.createdAt) {
            return null;
        }
        const timeString = format(new Date(answer?.createdAt), 'hh:mm a');
        const relativeTimeString = formatDistanceToNowStrict(new Date(answer?.createdAt));
        return `${timeString}, ${relativeTimeString} ago`;
    }, [answer?.createdAt]);


    return (
        <article
            className='flex flex-col items-start justify-center p-5 lg:p-8 rounded-xl
        '
        >
            <div className='flex items-center gap-x-2'>
                <Avatar
                    isSuggestionAvatar
                    isNavigable={true}
                    userId={answer.authorId}
                    profilePicture={answer.author.profilePicture}
                />
                <p className='text-xl font-semibold'>
                    {answer.author.name}
                </p>
                <p className='text-sm text-[#343a40]/70'>
                    answered {createdAtCalculation}
                </p>
            </div>

            <div
                dangerouslySetInnerHTML={{ __html: markdownToHtml(answer.body) }}
                className='md:text-lg lg:text-xl my-5'
            />

            <ForumButton />
        </article>
    )
}

export default AnswerCard