import useLoginModal from '@/hooks/useLoginModal';
import { successNotification } from '@/helpers/success-notification';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { TbLogout } from 'react-icons/tb';

type Props = {
    label?: boolean;
};

const LogoutButton = ({ label }: Props) => {

    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleLoginModal = useLoginModal();


    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await signOut({ redirect: false });
            setTimeout(() => successNotification('Logged out successfully'), 1000);
            setIsLoading(false);
            handleLoginModal.onOpen()
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
