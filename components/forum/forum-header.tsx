"use client"

import React from 'react'

import useQuestionModal from '@/hooks/useQuestionModal'

type Props = {}

const ForumHeader = (props: Props) => {

    const { onOpen: openQuesitonModal } = useQuestionModal();

    return (
        <section
            className='lg:col-span-5 w-full flex items-center justify-between '
        >
            <h1 className='text-4xl uppercase font-bold'>
                All Questions
            </h1>

            {/*Button */}
            <button
                onClick={openQuesitonModal}
                className='bg-[#1abc9c] hover:bg-[#1abc9c]/70 transition 
                duration-500 text-[#fefefe] py-2 px-6 text-lg font-medium 
                rounded-lg'
            >
                Ask a Question
            </button>
        </section>
    )
}

export default ForumHeader