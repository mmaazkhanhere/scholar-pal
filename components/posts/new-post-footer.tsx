/*A react component that represents the footer of the new post modal. It
includes buttons to upload media, create an event, and create a poll */

import React from 'react'

import UploadMedia from '../upload-media';

import { MdEvent } from "react-icons/md";
import { FaPoll } from "react-icons/fa";


type Props = {}

const NewPostFooter = (props: Props) => {
    return (
        <section className='flex items-center justify-start gap-x-5'>
            {/*Upload Media */}
            <UploadMedia />

            {/*Create an event */}
            <button
                aria-label='Event button'
                title='Add Event'
            >
                <MdEvent className='w-6 h-6 hover:opacity-80 cursor-pointer' />
            </button>

            {/*Create a poll */}
            <button
                aria-label='Poll Button'
                title='Add Poll'
            >
                <FaPoll className='w-6 h-6 hover:opacity-80 cursor-pointer' />
            </button>
        </section>
    )
}

export default NewPostFooter