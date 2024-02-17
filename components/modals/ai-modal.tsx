"use client"

import React, { useState } from 'react';
import OpenAI from 'openai';
import Modal from '../modal';
import Input from '../input';

import { IoSendSharp } from "react-icons/io5";

import useAIModal from '@/hooks/useAIModal';

type Props = {};

const AIModal = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [secretKey, setSecretKey] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [response, setResponse] = useState<string>('');

    const handleAIModal = useAIModal()

    const openai = new OpenAI({
        apiKey: secretKey,
        dangerouslyAllowBrowser: true,
    });

    const chatFunction = async () => {
        setIsLoading(true);
        setResponse(''); // Clear previous responses

        try {
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: "You are a helpful and knowledgeable assistant, skilled at explaining complex topics in an easy-to-understand way. Use simple language and concrete examples to ensure clarity."
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                stream: true,
            });

            for await (const message of chatCompletion) {
                // Assuming 'message' is the structure you get back from the stream
                setResponse((prev) => prev + '\n' + message.choices[0].delta.content);
            }
        } catch (error) {
            console.error('Error in streaming response:', error);
            setResponse('Error getting response from AI.');
        }

        setIsLoading(false);
    };

    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-y-2'>
                <Input
                    label='OpenAI API Secret Key'
                    placeholder='Enter your OpenAI secret key...'
                    type='password'
                    value={secretKey}
                    disabled={isLoading}
                    onChange={(event) => setSecretKey(event.target.value)}
                />
                <p className='text-red-500 text-sm'>
                    <span className='font-bold'>Note</span>: Do not upload or share your secret key anywhere public. This is a stateless session and your secret key is not stored anywhere. Use only for application testing only.
                </p>
            </div>

            {
                secretKey.length > 0 && (
                    <div className='flex gap-2'>
                        <div className='w-full'>
                            <Input
                                label='Ask AI'
                                placeholder='Ask ScholarPal AI Assistant...'
                                type='text'
                                value={question}
                                disabled={isLoading}
                                onChange={(event) => setQuestion(event.target.value)}
                            />
                        </div>
                        <button
                            className=' self-end w-24 bg-[#1abc9c] font-semibold
                        p-2 rounded-xl text-white hover:scale-95 transition duration-500
                        disabled:opacity-75 disabled:cursor-not-allowed flex
                        items-center gap-2 '
                        >
                            <span className='hidden lg:block'>Ask</span>
                            <IoSendSharp className='w-5 lg:w-4 h-5 lg:h-4' />
                        </button>
                    </div>
                )
            }
        </div>
    );

    const modalFooter: React.ReactNode = (
        <textarea
            readOnly
            className="w-full h-auto p-2 border"
            value={response}
            placeholder="AI's response will appear here..."
        />
    );

    return (
        <Modal
            title="Ask ScholarPal AI"
            body={modalBody}
            footer={modalFooter}
            isOpen={true}
            onClose={() => (handleAIModal.onClose)}
            onSubmit={() => console.log('AI Modal')}
        />
    );
};

export default AIModal;
