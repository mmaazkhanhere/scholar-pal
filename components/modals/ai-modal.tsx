/*A  react component that is designed to interact with OpenAI's API to provide
AI-powered responses within a modal interface. The component allows users to
input a question, which is sent to the OpenAI model for processing. The model's
response is streamed back and displayed in the modal.  */

"use client"

import React, { useState } from 'react';
import OpenAI from 'openai';
import Modal from '../modal';
import Input from '../input';

import { IoSendSharp } from "react-icons/io5";

import useAIModal from '@/hooks/useAIModal';

type Props = {};

const AIModal = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false); /*Loading state of
    the modal */
    const [secretKey, setSecretKey] = useState<string>(''); /*State variable
    for openai api secret key that will be entered by the user */
    const [question, setQuestion] = useState<string>(''); /*State variable for the
    question that will be asked by the user */
    const [response, setResponse] = useState<string>(''); /*State variable for the
    response generated by the assistant */

    const handleAIModal = useAIModal() /*hook handle the visibility of the AI Modal */

    const openai = new OpenAI({
        apiKey: secretKey,
        dangerouslyAllowBrowser: true,
    });  /*create an instance of the OpenAI SDK whose api key is assigned to the
    key entered by the user */

    const chatFunction = async () => { /*this function is triggered when the user
    submits a question. */

        setIsLoading(true); /*the loading state of the modal is set to true thus
        disabling it*/
        setResponse(''); // Clear previous responses

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
            }); /*Constructs a request ot OpenAI's chat completion endpoint with 
            the user question and a system message that guides the AI how to
            respond to the user query */

            for await (const chunk of stream) {
                /*The function then listens to streamed responses from the OpenAI
                API and concatenate content of the response state, updating the
                UI in real time.  */
                setResponse((prev) => prev + (chunk.choices[0]?.delta?.content || ''));
            }
        } catch (error) {
            /*Catch All the errors that occurred during the process */
            console.error('Error in streaming response:', error);
            setResponse('Error getting response from AI.');
        }

        setIsLoading(false);
    };

    const modalBody: React.ReactNode = (
        /* The modal boyd that contains an input component for taking the 
        secret key from the user, displaying a caution text to the user. When
        the users enter the secret key, an Input component for asking the question,
        a submit button for taking the question to chat function and a text area
        where the response of the assistant is displayed*/

        <div className='flex flex-col gap-4'>

            {/*AI Secret key and Caution Text */}
            <div className='flex flex-col gap-y-4 lg:gap-y-2'>

                {/*Secret key input */}
                <Input
                    label='OpenAI API Secret Key'
                    placeholder='Enter your OpenAI secret key...'
                    type='password'
                    value={secretKey}
                    disabled={isLoading}
                    onChange={(event) => setSecretKey(event.target.value)}
                />

                {/*Caution text */}
                <p className='text-red-500 text-xs lg:text-sm'>
                    <span className='font-bold'>Note</span>: Do not upload or share your secret key anywhere public. This is a stateless session and your secret key is not stored anywhere. Use only for application testing only. Delete your secret key after using for safety
                </p>
            </div>

            {/*Displayed only when user enters the secret key */}
            {
                secretKey.length > 50 && (
                    <div className='flex flex-col gap-4'>

                        {/*Question and submit button */}
                        <div className='flex gap-2'>
                            {/*Question */}
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

                            {/*Send button */}
                            <button
                                aria-label='Ask AI Button'
                                title='Ask AI'
                                onClick={chatFunction}
                                type='submit'
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

                        {/*AI response */}
                        <textarea
                            readOnly
                            className="w-full min-h-[250px] p-2 border 
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
            onSubmit={() => console.log('')}
        />
    );
};

export default AIModal;
