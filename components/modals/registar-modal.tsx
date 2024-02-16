"use client"

import React, { useCallback, useState } from 'react'
import Input from '../input'
import Modal from '../modal'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import { successNotification } from '@/libs/success-notification'
import { signIn } from 'next-auth/react'
import { errorNotification } from '@/libs/error-notification'

type Props = {}

const RegisterModal = (props: Props) => {

    const handleLoginModal = useLoginModal()
    const handleRegisterModal = useRegisterModal()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/register', {
                name, username, email, password
            });

            setIsLoading(false);
            successNotification('Account Created');

            signIn('credentials', {
                email, password
            });
            handleRegisterModal.onClose()
        } catch (error: any) {
            setIsLoading(false);
            console.error(error, 'REGISTAR_MODAL_ERROR');
            if (error.status === 400) {
                errorNotification('Missing details')
            }
            else if (error.status === 500) {
                errorNotification('Internal Server Error')
            }
        }
    }

    const toggleModal = useCallback(() => {
        if (isLoading) {
            return;
        }
        handleRegisterModal.onClose()
        handleLoginModal.onOpen()
    }, [handleLoginModal, handleRegisterModal, isLoading])

    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-4'>
            {/*User Full Name */}
            <Input
                label='Full Name'
                placeholder='Jack Reacher'
                type='text'
                value={name}
                disabled={isLoading}
                onChange={(event) => setName(event.target.value)}
            />

            {/*User username */}
            <Input
                label='Username'
                placeholder='jackreacherhere'
                type='text'
                value={username}
                disabled={isLoading}
                onChange={(event) => setUsername(event.target.value)}
            />

            {/*User Email Address */}
            <Input
                label='Email Address'
                placeholder='jackreacherhere@mail.com'
                type='email'
                value={email}
                disabled={isLoading}
                onChange={(event) => setEmail(event.target.value)}
            />

            {/*User Password */}
            <Input
                label='Password'
                type='password'
                value={password}
                disabled={isLoading}
                onChange={(event) => setPassword(event.target.value)}
            />
        </div>
    )

    const modalFooter: React.ReactNode = (
        <div className='flex items-center space-x-4 text-[#343a40]/60'>
            <span>Already part of ScholarPal Family?</span>
            <button
                aria-label='Register User'
                onClick={toggleModal}
                className='underline hover:text-[#343a40]/90 cursor-pointer'
            >
                Login to your account
            </button>
        </div>
    )

    return (
        <React.Fragment>
            <ToastContainer />
            <Modal
                title='Register'
                disabled={isLoading}
                buttonLabel='Register'
                isOpen={handleRegisterModal.isOpen}
                body={modalBody}
                footer={modalFooter}
                onSubmit={handleSubmit}
                onClose={handleRegisterModal.onClose}
            />

        </React.Fragment>
    )
}

export default RegisterModal