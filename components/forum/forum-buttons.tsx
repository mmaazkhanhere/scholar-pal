"use client"

import { successNotification } from '@/helpers/success-notification';
import useQuestion from '@/hooks/useQuestion';
import useUpVote from '@/hooks/useUpVote';
import useUser from '@/hooks/useUser';
import { IAnswer } from '@/interface-d';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

import { MdThumbUp, MdThumbDown } from "react-icons/md";

type Props = {
    answer: IAnswer
    questionId?: string
}

const ForumButton = ({ answer, questionId }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const { user: currentUser } = useUser();
    const { mutate: updateAnswerAuthor } = useUser(answer.authorId);

    const { data: upVoteList = [], mutate: updateUpVoteList } = useUpVote(answer?.id);
    const { mutate: updateQuestion } = useQuestion(questionId);

    const [upVote, setUpVote] = useState(upVoteList?.includes(currentUser?.id as string));


    useEffect(() => {
        setUpVote(upVoteList?.includes(currentUser?.id as string));
    }, [currentUser?.id, upVoteList]);

    const handleUpVote = useCallback(async () => {
        try {
            setLoading(true)

            const request = await axios.post('/api/forum/upVote', {
                answerId: answer?.id,
            })

            if (request.status === 200) {
                successNotification('Upvoted')

                updateUpVoteList();
                updateQuestion();
                updateAnswerAuthor();

                setLoading(false);
            }

        } catch (error) {
            console.error('FORUM_BUTTON_HANDLE_UPVOTE_FUNCTION_ERROR', error);
        }
        finally {
            setLoading(false);
        }
    }, [answer?.id, updateAnswerAuthor, updateQuestion, updateUpVoteList])

    return (
        <div className='flex items-center gap-x-6 mt-5'>

            {/*Thumb Up Button */}
            <button
                disabled={loading}
                aria-label='Up Vote Button'
                title='Up Vote'
                className='flex items-center justify-center gap-x-2'
                onClick={handleUpVote}
            >
                <MdThumbUp
                    className={` ${upVote && 'fill-[#1abc9c]'} w-7 h-7 `}
                />
                <span>
                    {upVoteList.length}
                </span>
            </button>

            {/*Thumb Down Button */}
            <button className='flex items-center justify-center gap-x-2'>
                <MdThumbDown className='w-7 h-7' />
                <span>
                    {0}
                </span>
            </button>
        </div>
    )
}

export default ForumButton