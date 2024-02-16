"use client"

import React, { useCallback, useState } from 'react'
import Input from '../input'
import Modal from '../modal'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { ToastContainer, toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { successNotification } from '@/libs/success-notification'
import { errorNotification } from '@/libs/error-notification'


type Props = {}

const LoginModal = (props: Props) => {

    const handleLoginModal = useLoginModal()
    const handleRegisterModal = useRegisterModal()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await signIn('credentials', {
                email, password
            })
            successNotification('Logged In')
            handleLoginModal.onClose()
        } catch (error) {
            console.error(error, "LOGIN_ERROR")
            errorNotification('Something went wrong')
        }
    }

    const toggleModal = useCallback(() => {
        if (isLoading) {
            return;
        }
        handleLoginModal.onClose();
        handleRegisterModal.onOpen();
    }, [handleLoginModal, handleRegisterModal, isLoading])



    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-4'>
            <Input
                label='Email Address'
                placeholder='johndoe@mail.com'
                type='text'
                value={email}
                disabled={isLoading}
                onChange={(event) => setEmail(event.target.value)}
            />
            <Input
                label='Password'
                placeholder='Enter your password...'
                type='password'
                value={password}
                disabled={isLoading}
                onChange={(event) => setPassword(event.target.value)}
            />
        </div>
    )

    const modalFooter: React.ReactNode = (
        <div className='flex items-center space-x-4 text-[#343a40]/60'>
            <span>New to ScholarPal?</span>
            <button
                aria-label='Register User'
                onClick={toggleModal}
                className='underline hover:text-[#343a40]/90 cursor-pointer'
            >
                Register yourself with us
            </button>
        </div>
    )

    return (
        <>
            <ToastContainer />
            <Modal
                disabled={isLoading}
                isOpen={handleLoginModal.isOpen}
                title='Login'
                body={modalBody}
                buttonLabel='Login'
                onSubmit={handleSubmit}
                footer={modalFooter}
                onClose={handleLoginModal.onClose}
            />

        </>

    )
}

export default LoginModal