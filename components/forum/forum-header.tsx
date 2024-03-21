/*A react component that represents the header of the forum homepage where a heading
and a button is displayed. The button is used to open question modal to ask a
question */

"use client"

import React from 'react'

import useQuestionModal from '@/hooks/useQuestionModal'

type Props = {}

const ForumHeader = (props: Props) => {

    const { onOpen: openQuestionModal } = useQuestionModal();//hook to open question modal

    return (
        <section
            className='w-full flex items-center justify-between '
        >
            {/*Title */}
            <h1 className='text-2xl lg:text-4xl lg:uppercase font-medium lg:font-bold'>
                All Questions
            </h1>

            {/*Button */}
            <button
                aria-label='Ask Question Button'
                onClick={openQuestionModal}
                className='bg-[#1abc9c] hover:bg-[#1abc9c]/70 transition 
                duration-500 text-[#fefefe] py-1 lg:py-2 px-4 lg:px-6 text-sm
                lg:text-lg font-medium  rounded-lg'
            >
                Ask a Question
            </button>
        </section>
    )
}

export default ForumHeader