/*Header of the application that incorporates various elements and functionalities
to enhance user interaction and navigation within the application */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useCallback } from 'react'


import NavbarItems from './navbar-item'
import MobileNavbar from './mobile-navbar'
import Avatar from './avatar'

import { FaMagic, FaMedal } from 'react-icons/fa'
import { RiRobot2Fill } from 'react-icons/ri'
import { IoMdNotifications, IoMdMenu } from "react-icons/io";

import { IUser } from '@/interface-d'
import LogoutButton from './logout-button'
import useAIModal from '@/hooks/useAIModal'
import useLoginModal from '@/hooks/useLoginModal'
import { useSession } from 'next-auth/react'
import useUser from '@/hooks/useUser'


type Props = {}

const Header = (props: Props) => {

    const [showMobileMenu, setShowMobileMenu] = useState(false) /*state variable
    to control the visibility of the mobile menu*/

    const session = useSession()
    const { user } = useUser();

    const handleAIModal = useAIModal(); //hook to handle the visibility of AI modal
    const handleLoginModal = useLoginModal() //hook to handle the visibility of login modal

    const toggleMobileMenu = useCallback(() => {
        /*function that displays the mobile menu */

        setShowMobileMenu(!showMobileMenu)
    }, [showMobileMenu])

    const handleAIDisplay = () => {
        if (session.status !== 'authenticated') {
            handleLoginModal.onOpen()
        }
        else {
            handleAIModal.onOpen()
        }
    }

    return (
        <header
            className='w-full fixed z-40 bg-[#fefefe] shadow-sm'
        >
            <nav
                className='flex items-center justify-between max-w-[1600px]
                mx-auto px-2 lg:px-0'
            >
                {/*Logo and Assistant */}
                <div
                    className='flex items-center justify-start'
                >
                    {/*Logo */}
                    <Link href='/'>
                        <Image
                            src='/logo.png'
                            alt='ScholarPal Logo'
                            width={80}
                            height={80}
                            className='rounded-full hover:scale-105 w-16 h-16
                            lg:w-20 lg:h-20'
                        />
                    </Link>

                    {/*Assistant Large Screen*/}
                    <button
                        aria-label='Ask the Assistant'
                        onClick={handleAIDisplay}
                        className='border rounded-xl py-1.5 px-4 hidden lg:flex
                        items-center justify-start gap-5 w-[350px] cursor-pointer
                        hover:scale-105 transition duration-500'
                    >
                        <FaMagic className='w-5 h-5 text-[#1abc9c]' />
                        <p
                            className='text-[#343a40]/60'
                        >
                            Ask ScholarPal Assistant...
                        </p>
                    </button>

                    {/*Assistant Mobile */}
                    <button
                        aria-label='AI Assistant Button'
                        onClick={handleAIDisplay}
                        className='block lg:hidden hover:scale-105 pl-[2px]'
                    >
                        <RiRobot2Fill className='fill-[#1abc9c] w-7 h-7' />
                    </button>
                </div>

                {/*Navigation Items */}
                <div className='flex items-center justify-start gap-5 lg:gap-8'>
                    <NavbarItems />

                    <IoMdNotifications className='hidden lg:block w-7 h-7' />

                    <Avatar
                        isHeaderAvatar
                        userId={user?.id}
                        profilePicture={user?.profilePicture}
                    />

                    {/*Logout button that is displayed only in large screen */}
                    <div className='hidden lg:block'>
                        <LogoutButton label />
                    </div>

                    {/*Mobile Menu */}
                    <button
                        aria-label='Menu Button'
                        onClick={toggleMobileMenu}
                        className='block lg:hidden'
                    >
                        <IoMdMenu className='w-7 h-7' />
                        {
                            showMobileMenu && <MobileNavbar toggleButton={toggleMobileMenu} />
                        }

                    </button>
                </div>


            </nav>
        </header>
    )
}

export default Header