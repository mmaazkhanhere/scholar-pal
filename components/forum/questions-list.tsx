/*A react component that represents the list of questions on the homepage */

"use client"

import React from 'react'

import LoadingSpinner from '../loading-spinner'
import QuestionCard from './question-card'

import useQuestionFetch from '@/hooks/useQuestionFetch'

type Props = {}

const QuestionsList = (props: Props) => {

    const { data: questionList, isLoading } = useQuestionFetch(); /*custom react
    hook to fetch the list of questions */


    if (isLoading || !questionList) {
        /*While the list of questions is being fetched, display a loading spinner */
        <div className='w-full flex items-center justify-between'>
            <LoadingSpinner spinnerSize={75} />
        </div>
    }

    return (
        <div className='w-full mt-10'>

            {/*Question lists */}
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