import React from 'react';
import { AiFillPicture } from 'react-icons/ai';

type Props = {}

const UploadMedia = () => {

    return (
        <button
            aria-label='Media Button'
            title='Upload Media'
            type='button'
        >
            <AiFillPicture className='w-6 h-6 hover:opacity-80' />
        </button>
    );
};

export default UploadMedia;
