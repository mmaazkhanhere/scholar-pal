"use client"

import React, { useCallback, useState } from 'react'
import Input from '../input'
import Modal from '../modal'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { ToastContainer } from 'react-toastify'


type Props = {}

const LoginModal = (props: Props) => {

    const handleLoginModal = useLoginModal()
    const handleRegisterModal = useRegisterModal()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSumbit = () => {
        console.log('Modal Submitted')
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
                label='Username'
                placeholder='John Doe'
                type='text'
                value={username}
                disabled={isLoading}
                onChange={(event) => setUsername(event.target.value)}
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
            <Modal
                disabled={isLoading}
                isOpen={handleLoginModal.isOpen}
                title='Login'
                body={modalBody}
                buttonLabel='Login'
                onSubmit={handleSumbit}
                footer={modalFooter}
                onClose={handleLoginModal.onClose}
            />
            <ToastContainer />
        </>

    )
}

export default LoginModal