/*A react component that represents a card displaying an answer to a question 
in the forum. It displays the relative details of the answer author  */

"use client"

import React, { useMemo } from 'react'
import { format, formatDistanceToNowStrict } from 'date-fns'

import Avatar from '../avatar'
import ForumButton from './forum-buttons'

import { markdownToHtml } from '@/libs/showdown'

import { IAnswer } from '@/interface-d'

type Props = {
    answer: IAnswer
}

const AnswerCard = ({ answer }: Props) => {

    /*A function that uses useMemo to calculate and format the time of the 
    answer creation */
    const createdAtCalculation = useMemo(() => {

        if (!answer?.createdAt) {
            //if there is no createdAt (no answer), display nothing
            return null;
        }
        const timeString = format(new Date(answer?.createdAt), 'hh:mm a');/*specifies
        format the time string will be converted into. Here the format will be
        hour:minutes AM/PM. */

        const relativeTimeString = formatDistanceToNowStrict(new Date(answer?.createdAt));
        /*It calculates relative time since the answer was created using the
        function  */

        return `${timeString}, ${relativeTimeString} ago`; //return in specific format
    }, [answer?.createdAt]);


    return (
        <article
            className='flex flex-col items-start justify-center p-5 lg:p-8 
            rounded-xl'
        >
            <div className='flex items-center gap-x-2'>

                {/*Avatar */}
                <Avatar
                    isSuggestionAvatar
                    isNavigable={true}
                    userId={answer.authorId}
                    profilePicture={answer.author.profilePicture}
                />

                {/*Author name */}
                <p className='text-lg lg:text-xl font-semibold'>
                    {answer.author.name}
                </p>

                {/*Time of creation */}
                <p className='text-xs lg:text-sm text-[#343a40]/70'>
                    answered {createdAtCalculation}
                </p>
            </div>

            {/*Answer body that is displayed in the format created using the
            text editor (preserves the format of the answer) */}

            <div
                dangerouslySetInnerHTML={{ __html: markdownToHtml(answer.body) }}
                className='md:text-lg lg:text-xl my-5'
            />

            {/*Forum buttons (upvote and downvote) */}
            <ForumButton
                answer={answer}
                questionId={answer.questionId}
            />
        </article>
    )
}

export default AnswerCard