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
    buttonLabel: string //label of the action button
    disabled?: boolean //disables the modal an

}

const Modal: React.FC<Props> =
    ({ isOpen, title, body, footer, onClose, onSubmit, buttonLabel, disabled }) => {

        const handleClose = useCallback(() => {
            if (disabled) {
                return
            }
            onClose();
        }, [disabled, onClose])

        const handleSubmit = useCallback(() => {
            if (disabled) {
                return
            }

            onSubmit()
        }, [disabled, onSubmit])

        if (!isOpen) {
            return null;
        }

        return (
            <section
                className='flex items-center justify-center z-50 fixed 
                bg-black/70 inset-0'
            >
                <div
                    className='w-full lg:w-[50%] lg:max-w-3xl h-full lg:h-auto 
                    rounded-xl bg-[#fefefe]'
                >
                    <div
                        className='flex flex-col w-full h-full lg:h-auto relative
                        outline-none focus:outline-none shadow-lg p-10'
                    >
                        <div className='flex items-center justify-between'>
                            <h3
                                className='text-2xl font-semibold'
                            >
                                {title}
                            </h3>
                            <button
                                aria-label='Close Button'
                                onClick={handleClose}
                            >
                                <MdOutlineClose className='w-7 h-7 text-[#343a40]' />
                            </button>
                        </div>

                        <div className='flex-auto'>
                            {body}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Button
                                disabled={disabled}
                                label={buttonLabel}
                                large
                                onClick={handleSubmit}
                            />
                            {footer}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

export default Modal