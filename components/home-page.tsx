import React from 'react'
import NewPost from './posts/new-post'
import { IUser } from '@/interface-d'

type Props = {
    currentUser?: IUser
}

const HomePage = ({ currentUser }: Props) => {
    return (
        <section
            className='grid grid-cols-1 lg:grid-cols-7 lg:py-32 max-w-[1600px]
            mx-auto border px-4'
        >
            <div className='lg:col-span-5 w-full flex flex-col items-start '>
                <NewPost currentUser={currentUser} />
            </div>
            <div className='hidden lg:block lg:col-span-2 w-full border border-black'>
                Hello
            </div>
        </section>
    )
}

export default HomePage