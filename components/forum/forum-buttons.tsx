/*A react component that represents voting button of upvote and downvote for 
the answer given to a question. It uses axios to make a POST request to update
the upvote count and update user score. */

"use client"

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

import useDownVote from '@/hooks/useDownVote';
import useQuestion from '@/hooks/useQuestion';
import useUpVote from '@/hooks/useUpVote';
import useUser from '@/hooks/useUser';

import { successNotification } from '@/helpers/success-notification';
import { errorNotification } from '@/helpers/error-notification';

import { IAnswer } from '@/interface-d';

import { MdThumbUp, MdThumbDown } from "react-icons/md";


type Props = {
    answer: IAnswer
    questionId?: string
}

const ForumButton = ({ answer, questionId }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const { user: currentUser } = useUser(); //custom hook to fetch current user
    const { mutate: updateAnswerAuthor } = useUser(answer.authorId); //hook to update answer author

    const { data: upVoteList = [], mutate: updateUpVoteList } = useUpVote(answer?.id);
    /*fetch the upVote list and a mutate function to update the up vote list */

    const { data: downVoteList = [], mutate: updateDownVote } = useDownVote(answer?.id);
    /*fetch the downVote list and a mutate function to update the down vote list */

    const { mutate: updateQuestion } = useQuestion(questionId);
    /*mutate function to update the question */

    const [upVote, setUpVote] = useState(upVoteList?.includes(currentUser?.id as string));
    /*a state variable that is assign with a value which checks if the current logged
    in user exists in the the list. If so, it is true else false */

    const [downVote, setDownVote] = useState(downVoteList?.includes(currentUser?.id as string));
    /*a state variable that is assign with a value which checks if the current logged
    in user exists in the the list. If so, it is true else false */


    /*update the state variable whenever the current user or the down vote list
    or the upvote list changes */
    useEffect(() => {
        setUpVote(upVoteList?.includes(currentUser?.id as string));
        setDownVote(downVoteList?.includes(currentUser?.id as string));
    }, [currentUser?.id, downVoteList, upVoteList]);


    /*a function that is triggered when user clicks on up vote button. It makes
    a post request to specified api endpoint with the answer id in body. If
    the status of the request is 200, a success notification is displayed
    and question, answer author and the upvote list is updated. If any error occurs, 
    an error notification is displayed */
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
            errorNotification('Something went wrong')
        }
        finally {
            setLoading(false);
        }
    }, [answer?.id, updateAnswerAuthor, updateQuestion, updateUpVoteList])

    /*a function that is triggered when user clicks on down vote button. It makes
    a post request to specified api endpoint with the answer id in body. If
    the status of the request is 200, a success notification is displayed
    and question, answer author and the downvote list is updated. If any error occurs, 
    an error notification is displayed */
    const handleDownVote = useCallback(async () => {
        try {
            setLoading(true)

            const request = await axios.post('/api/forum/downVote', {
                answerId: answer?.id,
            })

            if (request.status === 200) {
                successNotification('Downvoted')

                updateUpVoteList();
                updateQuestion();
                updateAnswerAuthor();
                updateDownVote();

                setLoading(false);
            }

        } catch (error) {
            console.error('FORUM_BUTTON_HANDLE_DOWNVOTE_FUNCTION_ERROR', error);
        }
        finally {
            setLoading(false);
        }
    }, [answer?.id, updateAnswerAuthor, updateDownVote, updateQuestion, updateUpVoteList])

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
                {/*Icon */}
                <MdThumbUp
                    className={` ${upVote && 'fill-[#1abc9c]'} w-5 lg:w-7 h-5 lg:h-7 `}
                />

                {/*Count */}
                <span className='text-sm lg:text-base'>
                    {upVoteList.length}
                </span>
            </button>

            {/*Thumb Down Button */}
            <button
                aria-label='Downvote Button'
                title='Down Vote'
                className='flex items-center justify-center gap-x-2'
                onClick={handleDownVote}
            >
                {/*Icon */}
                <MdThumbDown
                    className={`${downVote && 'fill-red-500'} w-5 lg:w-7 h-5 lg:h-7`}
                />

                {/*Count */}
                <span className='text-sm lg:text-base'>
                    {downVoteList.length}
                </span>
            </button>
        </div>
    )
}

export default ForumButton