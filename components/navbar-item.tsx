/*component that represents the navigation item of the navbar */

import React from 'react'
import Link from 'next/link';

import { FaUserGroup } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdForum } from "react-icons/md";


type Props = {}

const NavbarItems = (props: Props) => {
    return (
        <div
            className='hidden lg:flex items-center justify-start gap-8'
        >
            <Link href='/'>
                <FaUserGroup
                    className='w-6 h-6 hover:scale-105 hover:opacity-95'
                />
            </Link>

            <Link href='/'>
                <BsPersonWorkspace
                    className='w-6 h-6 hover:scale-105 hover:opacity-95'
                />
            </Link>

            <Link href='/' >
                <MdForum
                    className='w-6 h-6 hover:scale-105 hover:opacity-95'
                />
            </Link>
        </div>
    )
}

export default NavbarItems