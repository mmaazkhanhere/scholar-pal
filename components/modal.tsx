import React, { useCallback } from 'react'

import { MdOutlineClose } from "react-icons/md";

import Button from './button';

type Props = {
    isOpen?: boolean //determines if the model is open
    onClose: () => void; // a function that closes the modal
    onSubmit: () => void; // a function for handling submit button
    title?: string //title of the modal
    body?: React.ReactNode // the body of the modal that is a React Component
    footer?: React.ReactNode // the footer of the modal that is a React Component
    buttonLabel?: string //label of the action button
    disabled?: boolean //disables the modal an

}

const Modal: React.FC<Props> =
    ({ isOpen, title, body, footer, onClose, onSubmit, buttonLabel, disabled }) => {

        const handleClose = useCallback(() => {
            //function that closes the modal
            if (disabled) {
                return
            }
            onClose();
        }, [disabled, onClose])

        const handleSubmit = useCallback(() => {
            //function that runs when submit button is clicked
            if (disabled) {
                return
            }

            onSubmit()
        }, [disabled, onSubmit])

        if (!isOpen) {
            //modal is not opened if the isOpen is false
            return null;
        }

        return (
            <section
                className='flex items-center justify-center fixed inset-0 z-50 
            bg-black/70'
            >
                <div className='w-[85%] lg:w-[50%] max-w-3xl bg-[#fefefe] 
                rounded-xl flex flex-col shadow-lg overflow-hidden p-10
                gap-5'
                >
                    {/* Header */}
                    <div className='flex items-center justify-between'>
                        {/*Title of the modal */}
                        <h3 className='text-2xl font-semibold'>
                            {title}
                        </h3>

                        {/*Button to close the modal */}
                        <button
                            onClick={handleClose}
                            aria-label='Close Button'
                        >
                            <MdOutlineClose className='w-7 h-7 text-[#343a40]' />
                        </button>
                    </div>

                    {/* Body */}
                    <div
                        className='max-h-[70vh] overflow-auto'
                        style={{
                            scrollbarWidth: 'none',
                        }} //make the body scrollable if it exceeds the max height
                    >
                        {body}
                    </div>

                    {/* Footer */}
                    {
                        buttonLabel && (
                            <Button
                                ariaLabel='Submit Button'
                                onClick={handleSubmit}
                                disabled={disabled}
                                label={buttonLabel}
                                className='w-full mt-5 lg:py-3'
                            />
                        )
                    }

                    {footer}
                </div>
            </section>
        );
    }

export default Modal