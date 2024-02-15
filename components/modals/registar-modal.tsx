import React, { useCallback, useState } from 'react'
import Input from '../input'
import Modal from '../modal'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { ToastContainer } from 'react-toastify'

type Props = {}

const RegisterModal = (props: Props) => {

    const handleLoginModal = useLoginModal()
    const handleRegisterModal = useRegisterModal()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = () => {
        console.log("Register")
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
        <div className='text-[#343a40]/60'>
            <p>Already part of ScholarPal Family?
                <span
                    onClick={toggleModal}
                    className='underline hover:text-[#343a40]/90 cursor-pointer'
                >
                    Login to your account
                </span>
            </p>
        </div>
    )

    return (
        <>
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
            <ToastContainer />
        </>
    )
}

export default RegisterModal