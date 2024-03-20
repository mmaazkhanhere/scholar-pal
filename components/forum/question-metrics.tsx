import useAnswerList from '@/hooks/useAnswerList';
import React from 'react'

import { CiHeart } from "react-icons/ci";
import { SiAnswer } from "react-icons/si";

type Props = {
    questionId: string;
}

const QuestionMetrics = ({ questionId }: Props) => {

    const { data: answerList } = useAnswerList(questionId)

    return (
        <div className='flex items-center gap-x-6'>
            <div className='flex items-center gap-x-1'>
                <CiHeart className='w-3 h-3' />
                <p className='text-sm text-[#343a40]/70'>
                    {0} Likes
                </p>
            </div>

            <div className='flex items-center gap-x-2'>
                <SiAnswer className='w-3 h-3' />
                <p className='text-sm text-[#343a40]/70'>
                    {answerList?.length} Answers
                </p>
            </div>
        </div>
    )
}

export default QuestionMetrics