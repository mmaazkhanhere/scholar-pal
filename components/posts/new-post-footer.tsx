import React from 'react'

import { AiFillPicture } from "react-icons/ai";
import { MdEvent } from "react-icons/md";
import { FaPoll } from "react-icons/fa";

type Props = {}

const NewPostFooter = (props: Props) => {
    return (
        <div className='flex items-center justify-start gap-x-5'>
            <div>
                <AiFillPicture className='w-6 h-6 hover:opacity-80 cursor-pointer' />
            </div>
            <div>
                <MdEvent className='w-6 h-6 hover:opacity-80 cursor-pointer' />
            </div>
            <div>
                <FaPoll className='w-6 h-6 hover:opacity-80 cursor-pointer' />
            </div>
        </div>
    )
}

export default NewPostFooter