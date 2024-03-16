"use client"

import React, { useState } from 'react'
import Modal from '../modal'
import useQuestionModal from '@/hooks/useQuestionModal'
import ReactQuill from 'react-quill';
import hljs from 'highlight.js';

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


    const handleQuestionModal = useQuestionModal();

    const modalBody: React.ReactNode = (
        <div className='flex flex-col items-start w-full'>
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
                onSubmit={() => console.log('submit')}
                buttonLabel='Ask Question'
            />
        </div>
    )
}

export default QuestionModal