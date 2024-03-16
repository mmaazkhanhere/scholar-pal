"use client"

import React, { useCallback, useState } from 'react'
import Modal from '../modal'
import useQuestionModal from '@/hooks/useQuestionModal'
import ReactQuill from 'react-quill';
import hljs from 'highlight.js';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import { successNotification } from '@/helpers/success-notification';
import { errorNotification } from '@/helpers/error-notification';
import Input from '../input';
import { useSession } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';

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
    'image',
    'video',
];

const QuestionModal = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [questionContent, setQuestionContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const handleQuestionModal = useQuestionModal();
    const { onOpen: openLoginModal } = useLoginModal();

    const { user: currentUser, mutate: updateCurrentUser } = useUser();
    const { status } = useSession();


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
    }, [currentUser?.id, handleQuestionModal, questionContent, title, updateCurrentUser])


    const modalBody: React.ReactNode = (
        <div className='flex flex-col items-start w-full gap-y-4'>

            <Input
                label='Title'
                disabled={loading}
                value={title}
                onChange={(event) => setTitle(event.target.value)}

            />

            <ReactQuill
                theme='snow'
                value={questionContent}
                onChange={setQuestionContent}
                className='w-full'
                modules={modules}
                formats={formats}

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