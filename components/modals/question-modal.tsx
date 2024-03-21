/*A react component that displays a modal for posting a question */

"use client"

import React, { useCallback, useState } from 'react'
import hljs from 'highlight.js';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import Modal from '../modal'
import Input from '../input';

import useQuestionModal from '@/hooks/useQuestionModal'
import useUser from '@/hooks/useUser';
import useLoginModal from '@/hooks/useLoginModal';
import useQuestionFetch from '@/hooks/useQuestionFetch';

import { successNotification } from '@/helpers/success-notification';
import { errorNotification } from '@/helpers/error-notification';
import TextEditor from '../text-editor';


type Props = {}


const QuestionModal = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [questionContent, setQuestionContent] = useState<string>('');/*state 
    variable for the content of question */

    const [title, setTitle] = useState<string>('');//title of the question

    const handleQuestionModal = useQuestionModal(); //hook to manage the question modal
    const { onOpen: openLoginModal } = useLoginModal(); //hook to open the login modal

    const { user: currentUser, mutate: updateCurrentUser } = useUser(); /*hook
    to fetch current user and mutate function to update the current user */

    const { mutate: updateQuestionList } = useQuestionFetch(); /*mutate function
    to update the list of questions */

    const { status } = useSession(); //status of the current user

    /*function that is called when user post the question. An http POST request
    is made to the specified endpoint. If the response status is 200, a success 
    notification is displayed with relative data being updated and the modal is
    closed. If any error occurs, an error notification is displayed */
    const handleSubmit = useCallback(async () => {

        try {

            if (status === 'unauthenticated') {
                openLoginModal();
            }

            setLoading(true);
            const request = await axios.post('/api/forum/question', {
                userId: currentUser?.id,
                content: questionContent,
                title: title,
            });

            if (request.status === 200) {
                successNotification('Question Posted');

                updateCurrentUser();
                updateQuestionList();

                setQuestionContent('')
                setLoading(false);
                handleQuestionModal.onClose();
            }

        } catch (error) {

            console.error('QUESTION_MODAL_HANDLE_SUBMIT_ERROR', error);

            if (axios.isAxiosError(error) && error.status == 401) {
                errorNotification('Unauthorized');
            }
            else if (axios.isAxiosError(error) && error.status == 400) {
                errorNotification('Missing Content');
            }
            else {
                errorNotification('Something went wrong')
            }
        } finally {
            setLoading(false);
        }
    }, [currentUser?.id, handleQuestionModal, openLoginModal, questionContent, status, title, updateCurrentUser, updateQuestionList])


    /*Body of the modal */
    const modalBody: React.ReactNode = (
        <div className='flex flex-col items-start w-full gap-y-4'>

            {/*Title of the question */}
            <Input
                label='Title'
                disabled={loading}
                value={title}
                onChange={(event) => setTitle(event.target.value)}

            />

            {/*Text Editor */}
            <TextEditor
                content={questionContent}
                setContent={setQuestionContent}
            />
        </div>
    )

    return (
        <div>
            <Modal
                disabled={loading}
                title='Ask Question'
                isOpen={handleQuestionModal.isOpen}
                onClose={handleQuestionModal.onClose}
                body={modalBody}
                onSubmit={handleSubmit}
                buttonLabel='Ask Question'
            />
        </div>
    )
}

export default QuestionModal