"use client"

import useQuestionFetch from '@/hooks/useQuestionFetch'
import React from 'react'
import LoadingSpinner from '../loading-spinner'

type Props = {}

const QuestionsList = (props: Props) => {

    const { data: questionList, isLoading } = useQuestionFetch();

    if (isLoading) {
        <div className='w-full flex items-center justify-between'>
            <LoadingSpinner spinnerSize={75} />
        </div>
    }

    console.log(questionList)

    return (
        <div className='pt-10'>
            Question List
        </div>
    )
}

export default QuestionsList