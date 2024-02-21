/*A react component that displays a login modal where the user enters their 
credentials to login in the application */

"use client"

import React, { useCallback, useState } from 'react'
import { SnackbarProvider } from 'notistack'
import { signIn } from 'next-auth/react'

import Input from '../input'
import Modal from '../modal'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'

type Props = {}

const LoginModal = (props: Props) => {

    const handleLoginModal = useLoginModal() //hook to handle login modal visibility
    const handleRegisterModal = useRegisterModal() /*hook to handle register modal visibility */

    //state variables for the user details

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        /*an async function that is called when the user clicks on login button.
        It  */
        try {
            setIsLoading(true); //disables the modal indicating sign in process in progress

            const result = await signIn('credentials', { redirect: false, email, password });
            //pass the user credential to sign in function of next auth

            setIsLoading(false);

            if (result?.error) {
                errorNotification(result.error);
                setIsLoading(false);
            } else {
                successNotification('Logged In');
                handleLoginModal.onClose();
                setIsLoading(false);
            }

        } catch (error) {

            /*catch errors that occurred during the process */
            setIsLoading(false);

            console.error(error, "LOGIN_ERROR")
            errorNotification('Something went wrong');
        }
    }


    const toggleModal = useCallback(() => {
        /*function that toggles between the register modal and the login modal */
        if (isLoading) {
            return;
        }
        handleLoginModal.onClose();
        handleRegisterModal.onOpen();
    }, [handleLoginModal, handleRegisterModal, isLoading])



    const modalBody: React.ReactNode = (
        /*The main body of the login modal. It has two input components for taking
        the user email and password */
        <div className='flex flex-col gap-4'>

            {/*Email */}
            <Input
                label='Email Address'
                placeholder='johndoe@mail.com'
                type='text'
                value={email}
                disabled={isLoading}
                onChange={(event) => setEmail(event.target.value)}
            />

            {/*Password */}
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

        /*The footer content that is displayed below the main body. It includes
        toggle button that takes the user to registar modal */
        <div
            className='flex items-center space-x-4 text-[#343a40]/60
        text-sm lg:text-base'
        >
            <span>New to ScholarPal?</span>

            {/*Toggle button */}
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
            <SnackbarProvider />
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