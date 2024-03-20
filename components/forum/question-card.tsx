

import { IQuestion } from '@/interface-d'
import React, { useMemo } from 'react'
import Avatar from '../avatar'
import QuestionMetrics from './question-metrics'
import { format, formatDistanceToNowStrict } from 'date-fns'
import Link from 'next/link'

type Props = {
    question: IQuestion
}

const QuestionCard = ({ question }: Props) => {


    const createdAtCalculation = useMemo(() => {
        if (!question.createdAt) {
            return null;
        }
        // Formats the date to show the time in 12-hour format with AM/PM
        const timeString = format(new Date(question.createdAt), 'hh:mm a');
        const relativeTimeString = formatDistanceToNowStrict(new Date(question.createdAt));
        return `${timeString}, ${relativeTimeString} ago`;
    }, [question.createdAt]);

    return (
        <article
            className='w-full shadow-lg flex flex-col items-start
            p-7 rounded-lg gap-y-4'
        >
            <Link
                href={`/forum/${question.id}`}
                className='lg:text-2xl font-semibold cursor-pointer'
            >
                {question.title}
            </Link>
            <div
                className='flex flex-col lg:flex-row lg:items-center 
            lg:justify-between w-full gap-y-4'
            >
                <div className='flex items-center gap-x-3'>
                    <Avatar
                        isHeaderAvatar
                        isNavigable={true}
                        profilePicture={question.author.profilePicture}
                        userId={question.authorId}
                    />

                    <p className='font-medium'>
                        {question.author.name}
                    </p>

                    <p className='hidden lg:block text-sm text-[#343a40]/60'>
                        asked {createdAtCalculation}
                    </p>
                </div>

                <div>
                    <QuestionMetrics
                        questionId={question.id}
                    />
                </div>
            </div>
        </article>
    )
}

export default QuestionCard