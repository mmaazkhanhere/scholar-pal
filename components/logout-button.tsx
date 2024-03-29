/*A logout button that logs out the user from the application using the next auth
functions */


import { signOut, useSession } from 'next-auth/react';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { TbLogout } from 'react-icons/tb';

import useUser from '@/hooks/useUser';
import useLoginModal from '@/hooks/useLoginModal';

import { successNotification } from '@/helpers/success-notification';


type Props = {
    label?: boolean; //an optional parameter for text displayed next to icon
};

const LogoutButton = ({ label }: Props) => {

    const { data: session } = useSession(); //gets the current session data
    const [isLoading, setIsLoading] = useState<boolean>(false); /*state
    variable to disable the button */

    const router = useRouter()

    const { mutate } = useUser(); //re-fetches the user

    const handleLoginModal = useLoginModal(); //hook to handle visibility of login modal


    const handleLogout = useCallback(async () => {
        /*function that is called when the user clicks on logout button.  */
        try {
            setIsLoading(true); //sets the loading state to true

            await signOut({ redirect: false }); //sign out the user

            successNotification('Logged out successfully');/*display a log out 
            notification */

            router.push('/');

            setIsLoading(false);
            mutate();

            handleLoginModal.onOpen() //open the login modal

        } catch (error) {
            console.error('ERROR_LOGOUT_FUNCTION', error);
        }
    }, [handleLoginModal, mutate, router]);


    return (
        <React.Fragment>
            {/*Displayed only if a user is signed in */}
            {
                session?.user?.email && (
                    <button
                        aria-label='Logout Button'
                        title='Logout Current User'
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
        </React.Fragment>
    );
};

export default LogoutButton;
