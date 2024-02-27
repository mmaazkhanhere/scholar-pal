import React from 'react'

import UploadMedia from '../upload-media';

import { MdEvent } from "react-icons/md";
import { FaPoll } from "react-icons/fa";


type Props = {}

const NewPostFooter = (props: Props) => {
    return (
        <div className='flex items-center justify-start gap-x-5'>
            <UploadMedia />
            <button
                aria-label='Event button'
                title='Add Event'
            >
                <MdEvent className='w-6 h-6 hover:opacity-80 cursor-pointer' />
            </button>
            <button
                aria-label='Poll Button'
                title='Add Poll'
            >
                <FaPoll className='w-6 h-6 hover:opacity-80 cursor-pointer' />
            </button>
        </div>
    )
}

export default NewPostFooter