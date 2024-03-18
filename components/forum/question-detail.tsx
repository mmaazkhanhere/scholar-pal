"use client"

import useQuestion from '@/hooks/useQuestion'
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import LoadingSpinner from '../loading-spinner'
import Avatar from '../avatar'

import { FaRegClock } from "react-icons/fa6";
import { SiAnswer } from "react-icons/si";
import { format, formatDistanceToNowStrict } from 'date-fns'
import { markdownToHtml } from '@/libs/showdown'
import ReactQuill from 'react-quill'
import hljs from 'highlight.js'
import Button from '../button'
import axios from 'axios'
import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'
import useAnswerList from '@/hooks/useAnswerList'
import { IAnswer } from '@/interface-d'
import AnswerCard from './answer-card'


type Props = {}

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
    syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value,
    },
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'code',
    'image',
    'video',
];


const QuestionDetail = (props: Props) => {

    const questionId = usePathname().split('/').pop();

    const [loading, setLoading] = useState<boolean>(false);
    const [answerContent, setAnswerContent] = useState<string>('');

    const { data: question, isLoading, mutate: updateQuestion } = useQuestion(questionId);
    const { data: answersList, mutate: updateAnswerList } = useAnswerList(questionId);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const request = await axios.post('/api/forum/answer', {
                questionId, answerContent
            })

            if (request.status == 200) {
                successNotification('Answer posted');
                updateQuestion();
                updateAnswerList();

                setAnswerContent('');
                setLoading(false);
            }
        } catch (error) {
            console.error('QUESTION_DETAIL_COMPONENT_HANDLE_SUBMIT_FUNCTION_ERROR', error);
            errorNotification('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const createdAtCalculation = useMemo(() => {
        if (!question?.createdAt) {
            return null;
        }
        const timeString = format(new Date(question?.createdAt), 'hh:mm a');
        const relativeTimeString = formatDistanceToNowStrict(new Date(question?.createdAt));
        return `${timeString}, ${relativeTimeString} ago`;
    }, [question?.createdAt]);

    if (isLoading || !question) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <LoadingSpinner spinnerSize={80} />
            </div>
        )
    }

    return (
        <section
            className='w-full mx-auto flex flex-col gap-y-4 mt-10 px-4 lg:px-2'
        >

            <Avatar
                isSuggestionAvatar
                isNavigable={true}
                profilePicture={question.author.profilePicture}
                userId={question.author.id}
            />

            <h1 className='text-3xl font-bold'>
                {question.title}
            </h1>

            {/*Creation Time and Answers Received */}
            <div className='flex items-center gap-x-6'>
                {/*Creation Time */}
                <div className='flex items-center gap-x-2 text-[#343a40]/70'>
                    <FaRegClock className='w-4 h-4' />
                    <span className='text-sm lg:text-sm '>
                        {createdAtCalculation}
                    </span>
                </div>

                {/*Answer */}
                <div className='flex items-center gap-x-2 text-[#343a40]/70'>
                    <SiAnswer className='w-4 h-4' />
                    <p className='text-sm lg:text-sm '>
                        {answersList?.length} Answers
                    </p>
                </div>
            </div>

            {/*Question*/}

            <div
                dangerouslySetInnerHTML={{ __html: markdownToHtml(question.body) }}
                className='lg:text-xl my-5'
            />

            <div className='w-full flex flex-col gap-y-4 lg:mt-10'>
                <span className='font-bold text-lg'>
                    Write your answer
                </span>
                <ReactQuill
                    value={answerContent}
                    onChange={setAnswerContent}
                    className='w-full '
                    theme='snow'
                    modules={modules}
                    formats={formats}
                />
                <Button
                    ariaLabel='Submit Button'
                    disabled={loading}
                    label='Submit'
                    onClick={handleSubmit}
                    className='w-20'
                />
            </div>

            <div className='flex flex-col items-start lg:mt-20'>
                <h3 className='lg: text-2xl font-medium'>
                    {question.answers.length} Answers
                </h3>
                <div
                    className='flex flex-col items-start gap-y-4 my-10
                shadow-xl'
                >
                    {
                        answersList?.map((answer: IAnswer) => (
                            <AnswerCard
                                key={answer.id}
                                answer={answer}
                            />
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default QuestionDetail