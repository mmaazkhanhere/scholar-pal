"use client"

import React from 'react'

import useQuestionModal from '@/hooks/useQuestionModal'

type Props = {}

const ForumHeader = (props: Props) => {

    const { onOpen: openQuestionModal } = useQuestionModal();

    return (
        <section
            className='w-full flex items-center justify-between '
        >
            <h1 className='text-2xl lg:text-4xl uppercase font-medium lg:font-bold'>
                All Questions
            </h1>

            {/*Button */}
            <button
                onClick={openQuestionModal}
                className='bg-[#1abc9c] hover:bg-[#1abc9c]/70 transition 
                duration-500 text-[#fefefe] py-1 lg:py-2 px-4 lg:px-6 lg:text-lg font-medium 
                rounded-lg'
            >
                Ask a Question
            </button>
        </section>
    )
}

export default ForumHeader