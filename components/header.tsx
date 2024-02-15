import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Avatar from './avatar'
import NavbarItems from './navbar-item'

import { FaMagic } from 'react-icons/fa'
import { RiRobot2Fill } from 'react-icons/ri'
import { IoMdNotifications } from "react-icons/io";
import { TbLogout } from "react-icons/tb";


type Props = {}

const Header = (props: Props) => {
    return (
        <header
            className='w-full fixed z-50 bg-[#fefefe] shadow-sm'
        >
            <nav
                className='flex items-center justify-between max-w-[1600px]
                mx-auto px-2 lg:px-0'
            >
                {/*Logo and Assistant */}
                <div
                    className='flex items-center justify-start '
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
                    <div
                        aria-label='Ask the Assistant'
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
                    </div>

                    {/*Assistant Mobile */}
                    <button
                        aria-label='AI Assistant Button'
                        className='block lg:hidden hover:scale-105'
                    >
                        <RiRobot2Fill className='fill-[#1abc9c] w-7 h-7' />
                    </button>
                </div>

                {/*Navigation Items */}
                <div className='flex items-center justify-start gap-4 lg:gap-8'>
                    <NavbarItems />
                    <IoMdNotifications className='hidden lg:block w-7 h-7' />
                    <Avatar />
                    <TbLogout className='hidden lg:block w-7 h-7' />
                </div>
            </nav>
        </header>
    )
}

export default Header