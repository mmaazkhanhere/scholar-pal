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
        <div className='w-full mt-10'>
            {
                questionList?.map((question) => (
                    <div
                        key={question.id}
                        className='flex flex-col gap-y-10 lg:gap-y-4'
                    >
                        <QuestionCard
                            question={question}
                        />
                    </div>

                ))
            }
        </div>
    )
}

export default QuestionsList