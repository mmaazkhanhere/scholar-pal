/*a react component that represents the UI of the top questions suggestion card.
It displays the question title and a navigation arrow. When user clicks on the
card, they are navigated to the question detail overview*/

import Link from 'next/link'
import React from 'react'

import { IoMdArrowDropright } from "react-icons/io";

type Props = {
    questionTitle: string,
    questionId: string,
}

const QuestionSuggestionCard = ({ questionTitle, questionId }: Props) => {
    return (
        <Link
            href={`/forum/${questionId}`}
            className='flex items-center justify-between p-2 w-full
            hover:text-[#343a40]/75'
        >

            <p className='text-lg font-semibold'>
                {questionTitle}
            </p>

            <IoMdArrowDropright className='w-5 h-5' />
        </Link>
    )
}

export default QuestionSuggestionCard