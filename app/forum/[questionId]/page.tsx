import QuestionDetail from '@/components/forum/question-detail'
import Header from '@/components/header'
import Link from 'next/link'
import React from 'react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

type Props = {}

const QuestionDetailPage = (props: Props) => {
    return (
        <section>
            <Header />

            <div
                className='flex flex-col items-start pt-24 mx-auto max-w-[1600px]
            px-2 lg:px-0'
            >
                <Link href='/forum'>
                    <IoArrowBackCircleOutline className='w-10 h-10' />
                </Link>
                <QuestionDetail />
            </div>
        </section>
    )
}

export default QuestionDetailPage