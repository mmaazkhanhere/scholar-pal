/*A logout button that logs out the user from the application using the next auth
functions */

import useLoginModal from '@/hooks/useLoginModal';
import { successNotification } from '@/helpers/success-notification';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { TbLogout } from 'react-icons/tb';

type Props = {
    label?: boolean; //an optional parameter for text displayed next to icon
};

const LogoutButton = ({ label }: Props) => {

    const { data: session } = useSession(); //gets the current session data
    const [isLoading, setIsLoading] = useState<boolean>(false); /*state
    variable to disable the button */

    const handleLoginModal = useLoginModal(); //hook to handle visibility of login modal


    const handleLogout = async () => {
        /*function that is called when the user clicks on logout button.  */
        try {
            setIsLoading(true); //sets the loading state to true
            await signOut({ redirect: false }); //sign out the user
            setTimeout(() => successNotification('Logged out successfully'), 1000);
            /*display a log out notification */
            setIsLoading(false);

            handleLoginModal.onOpen() //open the login modal

        } catch (error) {
            console.error('ERROR_LOGOUT_FUNCTION', error);
        }
    };


    return (
        <>
            {
                session?.user?.email && (
                    <button
                        disabled={isLoading}
                        onClick={() => {
                            handleLogout()
                        }}
                        className='flex items-center w-full lg:w-auto justify-between'>
                        <TbLogout className='w-5 lg:w-7 h-5 lg:h-7' />
                        {/* Hide label on large screens and show only on small screens */}
                        {
                            label && (
                                <span className='lg:hidden ml-2'>
                                    Logout
                                </span>
                            )
                        }
                    </button>
                )
            }
        </>
    );
};

export default LogoutButton;
