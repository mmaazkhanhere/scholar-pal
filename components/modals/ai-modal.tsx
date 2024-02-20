

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

        const openai = new OpenAI({
            apiKey: secretKey,
            dangerouslyAllowBrowser: true, // Note: Be cautious with this in client-side code
        });

        try {
            const stream = await openai.chat.completions.create({
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

            for await (const chunk of stream) {
                setResponse((prev) => prev + (chunk.choices[0]?.delta?.content || ''));
            }
        } catch (error) {
            console.error('Error in streaming response:', error);
            setResponse('Error getting response from AI.');
        }

        setIsLoading(false);
    };

    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-y-4 lg:gap-y-2'>
                <Input
                    label='OpenAI API Secret Key'
                    placeholder='Enter your OpenAI secret key...'
                    type='password'
                    value={secretKey}
                    disabled={isLoading}
                    onChange={(event) => setSecretKey(event.target.value)}
                />
                <p className='text-red-500 text-xs lg:text-sm'>
                    <span className='font-bold'>Note</span>: Do not upload or share your secret key anywhere public. This is a stateless session and your secret key is not stored anywhere. Use only for application testing only. Delete your secret key after using for safety
                </p>
            </div>

            {
                secretKey.length > 0 && (
                    <div className='flex flex-col gap-4'>
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
                                onClick={chatFunction}
                                className=' self-end w-16 lg:w-24 bg-[#1abc9c] font-semibold
                                p-2.5 lg:p-2 rounded-xl text-white hover:scale-95 
                                transition duration-500 disabled:opacity-75 
                                disabled:cursor-not-allowed flex items-center 
                                justify-center gap-2 '
                            >
                                <span className='hidden lg:block'>Ask</span>
                                <IoSendSharp className='w-5 lg:w-4 h-5 lg:h-4' />
                            </button>


                        </div>
                        <textarea
                            readOnly
                            className="w-full min-h-[100px] p-2 border 
                            resize-y overflow-auto "
                            value={response}
                            placeholder="AI's response will appear here..."
                        />
                    </div>

                )
            }
        </div>
    );


    return (
        <Modal
            disabled={isLoading}
            title="Ask ScholarPal Assistant"
            body={modalBody}
            isOpen={handleAIModal.isOpen}
            onClose={handleAIModal.onClose}
            onSubmit={() => console.log('AI Modal')}
        />
    );
};

export default AIModal;
