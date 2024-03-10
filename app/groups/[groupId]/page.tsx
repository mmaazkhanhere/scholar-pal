import GroupSidebar from '@/components/groups/group-sidebar';
import Header from '@/components/header'
import Link from 'next/link'
import React from 'react'

import { IoArrowBackCircleOutline } from "react-icons/io5";

type Props = {}

const GroupPage = (props: Props) => {
    return (
        <main>
            <Header />
            <section
                className='flex flex-col items-start pt-24 max-w-[1600px] mx-auto
                lg:px-2 px-4'
            >
                <Link href='/'>
                    <IoArrowBackCircleOutline className='w-10 h-10' />
                </Link>
                <div className='grid grid-cols-1 lg:grid-cols-7 w-full'>
                    <GroupSidebar />
                </div>
            </section>
        </main>
    )
}

export default GroupPage