/*A react component which represents the detail view of question, read existing 
answers, and submit their answers. It provides a rich text editor for composing
answers and updates the UI dynamically based on user interactions and data changes*/

"use client"

import React, { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import ReactQuill from 'react-quill'
import hljs from 'highlight.js'
import axios from 'axios'
import { format, formatDistanceToNowStrict } from 'date-fns'

import LoadingSpinner from '../loading-spinner'
import Avatar from '../avatar'
import AnswerCard from './answer-card'
import Button from '../button'

import useQuestion from '@/hooks/useQuestion'
import useAnswerList from '@/hooks/useAnswerList'
import useTopQuestion from '@/hooks/useTopQuestions'

import { markdownToHtml } from '@/libs/showdown'

import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'

import { IAnswer } from '@/interface-d'

import { FaRegClock } from "react-icons/fa6";
import { SiAnswer } from "react-icons/si";


type Props = {}


/*These constants define configuration options for the ReactQuill editor */

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }], //heading section
        ['bold', 'italic', 'underline', 'strike', 'blockquote'], //text formatting
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        //creating ordered and unordered lists
        ['link', 'image'], //adding hyperlinks and images
        ['clean'], //remove all formatting from selected text
    ],
    syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value, /*syntax 
        for highlight feature */
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

    const questionId = usePathname().split('/').pop();//get question id from url path

    const [loading, setLoading] = useState<boolean>(false);
    const [answerContent, setAnswerContent] = useState<string>(''); /*state variable
    for the answer content */

    const { data: question, isLoading, mutate: updateQuestion } = useQuestion(questionId);
    /*custom hook to fetch the question details and a mutate function to update
    the question */

    const { data: answersList, mutate: updateAnswerList } = useAnswerList(questionId);
    /*custom hook to fetch the list of answers and a mutate function to update
    the list of answers */

    const { mutate: updateTopQuestions } = useTopQuestion();/*mutate function
    to update the top questions */

    /*function is called when user posts an answer. It makes an http POST request
    to specified endpoint. If the response status is 200, a success notification 
    is displayed. The question, list of answers and top questions list is
    updated. If any error occurs, an error notification is displayed */
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
                updateTopQuestions();

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

    /*function to calculate relative time of question creation and display it 
    in specific format */
    const createdAtCalculation = useMemo(() => {
        if (!question?.createdAt) {
            return null;
        }
        const timeString = format(new Date(question?.createdAt), 'hh:mm a');
        const relativeTimeString = formatDistanceToNowStrict(new Date(question?.createdAt));
        return `${timeString}, ${relativeTimeString} ago`;
    }, [question?.createdAt]);


    /*While the question details are being fetched, display a loading spinner */
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

            {/*Author Avatar */}
            <Avatar
                isSuggestionAvatar
                isNavigable={true}
                profilePicture={question.author.profilePicture}
                userId={question.author.id}
            />

            {/*Question title */}
            <h1 className='text-2xl lg:text-3xl font-bold'>
                {question.title}
            </h1>

            {/*Creation Time and Answers Received */}
            <div className='flex items-center gap-x-6'>
                {/*Creation Time */}
                <div className='flex items-center gap-x-2 text-[#343a40]/70'>

                    {/*Icon */}
                    <FaRegClock className='w-4 h-4' />

                    {/*Time of Creation */}
                    <span className='text-sm lg:text-sm '>
                        {createdAtCalculation}
                    </span>
                </div>

                {/*Answer */}
                <div className='flex items-center gap-x-2 text-[#343a40]/70'>

                    {/*Icon */}
                    <SiAnswer className='w-4 h-4' />

                    {/*Total answers */}
                    <p className='text-sm lg:text-sm '>
                        {answersList?.length} Answers
                    </p>
                </div>
            </div>

            {/*Question body*/}

            <div
                dangerouslySetInnerHTML={{ __html: markdownToHtml(question.body) }}
                className='lg:text-xl my-5'
            />

            {/*New Answer */}
            <div className='w-full flex flex-col gap-y-4 lg:mt-10'>

                {/*Subheading */}
                <h3 className='font-bold text-lg'>
                    Write your answer
                </h3>

                {/*text editor */}
                <ReactQuill
                    value={answerContent}
                    onChange={setAnswerContent}
                    className='w-full '
                    theme='snow'
                    modules={modules}
                    formats={formats}
                />

                {/*button to submit answer */}
                <Button
                    ariaLabel='Submit Button'
                    disabled={loading}
                    label='Submit'
                    onClick={handleSubmit}
                    className='w-20'
                />
            </div>

            {/*List of answers */}
            <div className='flex flex-col items-start lg:mt-20'>

                {/*Subheading */}
                <h3 className='text-lg lg:text-2xl font-medium'>
                    {question.answers.length} Answers
                </h3>

                {/*List of answers */}
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