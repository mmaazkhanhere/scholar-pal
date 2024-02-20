/*A react component that displays a register modal which takes user detail to
register them with the application */

"use client"

import React, { useCallback, useState } from 'react'
import Input from '../input'
import Modal from '../modal'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import { successNotification } from '@/helpers/success-notification'
import { signIn } from 'next-auth/react'
import { errorNotification } from '@/helpers/error-notification'

type Props = {}

const RegisterModal = (props: Props) => {

    const handleLoginModal = useLoginModal() //hook to manage the login modal visibility
    const handleRegisterModal = useRegisterModal() //hook to manage the register modal visibility

    //state variables for the user credentials

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async () => {
        /*An async function that is called when the user clicks on Register button.
        The modal is disabled by setting the isLoading state variable to true. 
        The credentials of the user are passed to the register endpoint */

        setIsLoading(true);
        try {
            await axios.post('/api/register', {
                name, username, email, password
            }); //make a POST request to endpoint passing user details

            const result = await signIn('credentials', {
                email, password, redirect: false
            }); //sign in the user

            //displaying different notifications based on the user status

            if (result?.ok) {
                setTimeout(() => successNotification('Account Created'), 1000);
                handleRegisterModal.onClose();
            } else {
                setTimeout(() => errorNotification('Some error occurred'), 1000);
            }

        } catch (error) {

            /*Catch errors and display and appropriate notification */

            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                setTimeout(() => errorNotification('Missing Credentials'), 1000);
            }
            else if (axios.isAxiosError(error) && error.response?.status === 409) {
                setTimeout(() => errorNotification('User Already Exists'), 1000);
            }
            else {
                setTimeout(() => errorNotification('Some error occurred'), 1000);
            }
            console.error(error, 'REGISTER_MODAL_ERROR');
        }
    };


    const toggleModal = useCallback(() => {
        /*function that toggles between register modal and login modal */
        if (isLoading) {
            return;
        }
        handleRegisterModal.onClose()
        handleLoginModal.onOpen()
    }, [handleLoginModal, handleRegisterModal, isLoading])

    const modalBody: React.ReactNode = (

        /*Body of the modal that contains input component to take user details
        from the user */

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

        /*Footer content displayed below the main body of the modal. It contains
        a toggle button to close the register modal and display login modal */

        <div
            className='flex items-center space-x-4 text-[#343a40]/60
        text-sm lg:text-base'
        >
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