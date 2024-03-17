"use client"

import useQuestionFetch from '@/hooks/useQuestionFetch'
import React from 'react'
import LoadingSpinner from '../loading-spinner'
import QuestionCard from './question-card'

type Props = {}

const QuestionsList = (props: Props) => {

    const { data: questionList, isLoading } = useQuestionFetch();

    if (isLoading || !questionList) {
        <div className='w-full flex items-center justify-between'>
            <LoadingSpinner spinnerSize={75} />
        </div>
    }

    return (
        <div className='w-full border mt-10 flex flex-col gap-y-4'>
            {
                questionList?.map((question) => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                    />
                ))
            }
        </div>
    )
}

export default QuestionsList