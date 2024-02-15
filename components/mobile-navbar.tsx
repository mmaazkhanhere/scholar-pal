import React from 'react';
import Link from 'next/link';

import { FaUserGroup } from "react-icons/fa6";
import { BsPersonWorkspace } from 'react-icons/bs';
import { MdForum, MdOutlineClose } from 'react-icons/md';
import { TbLogout } from "react-icons/tb";
import { IoMdNotifications } from 'react-icons/io';

type Props = {
    toggleButton(): void;
};

const MobileNavbar: React.FC<Props> = ({ toggleButton }) => {
    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
        >
            <div
                className="bg-white p-5 rounded-lg flex flex-col items-center 
            space-y-4 w-48"
            >
                <button
                    aria-label='Close Menu'
                    onClick={toggleButton}
                    className='self-start'
                >
                    <MdOutlineClose size="1.5em" />
                </button>


                <Link href="/"
                    className='flex justify-between items-center w-full'
                >
                    <FaUserGroup
                        className="w-5 h-5 hover:scale-105 hover:opacity-95"
                    />
                    <span>Study Groups</span>
                </Link>

                <Link href="/"
                    className='flex justify-between items-center w-full'
                >
                    <BsPersonWorkspace
                        className='w-5 h-5 hover:scale-105 hover:opacity-95'
                    />
                    <span>Tutor</span>
                </Link>

                <Link href="/"
                    className='flex justify-between items-center w-full'
                >
                    <MdForum
                        className='w-5 h-5 hover:scale-105 hover:opacity-95'
                    />
                    <span>Forums</span>
                </Link>

                <Link href="/"
                    className='flex justify-between items-center w-full'
                >
                    <IoMdNotifications
                        className='w-5 h-5 hover:scale-105 hover:opacity-95'
                    />
                    <span>Notifications</span>
                </Link>

                <Link href="/"
                    className='flex justify-between items-center w-full'
                >
                    <TbLogout
                        className='w-5 h-5 hover:scale-105 hover:opacity-95'
                    />
                    <span>Logout</span>
                </Link>

            </div>
        </div>
    );
};

export default MobileNavbar;
