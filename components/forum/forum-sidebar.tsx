/*A react component that represents a sidebar for the forum homepage. In this
component, a list of top questions are displayed, which are sorted from
top to bottom with question with more answer on top */

"use client"

import React from 'react'

import QuestionSuggestionCard from './question-suggestion-card'

import useTopQuestion from '@/hooks/useTopQuestions'

import { IQuestion } from '@/interface-d'

type Props = {}

const ForumSidebar = (props: Props) => {

    const { data: topQuestionsList } = useTopQuestion();
    return (
        <section
            className='flex flex-col items-start justify-center p-5 max-w-md w-full
        border rounded-xl'
        >
            {/*Heading */}
            <h2 className='text-center font-semibold lg:text-2xl'>
                Top Questions
            </h2>

            {/*Questions list */}
            <div
                className='flex flex-col items-start gap-y-2 
                self-start mt-5 w-full'
            >
                {
                    topQuestionsList?.map((topQuestion: IQuestion) => (
                        <QuestionSuggestionCard
                            key={topQuestion.id}
                            questionTitle={topQuestion.title}
                            questionId={topQuestion.id}
                        />
                    ))
                }

            </div>
        </section>
    )
}

export default ForumSidebar