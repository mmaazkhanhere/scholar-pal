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
        setIsLoading(true);
        try {
            await axios.post('/api/register', {
                name, username, email, password
            });

            const result = await signIn('credentials', {
                email, password, redirect: false
            });

            if (result?.ok) {
                setTimeout(() => successNotification('Account Created'), 500);
                handleRegisterModal.onClose();
            } else {
                setTimeout(() => errorNotification('Some error occurred'), 500);
            }

        } catch (error) {

            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                setTimeout(() => errorNotification('Missing Credentials'), 500);
            }
            else if (axios.isAxiosError(error) && error.response?.status === 409) {
                setTimeout(() => errorNotification('User Already Exists'), 500);
            }
            else {
                setTimeout(() => errorNotification('Some error occurred'), 500);
            }
            console.error(error, 'REGISTER_MODAL_ERROR');
        }
    };


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