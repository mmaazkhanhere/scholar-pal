
import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';

type Props = {}

const CreateGroupButton: React.FC<Props> = () => {
    return (
        // Using TailwindCSS for styling
        <button
            className="flex items-center justify-center gap-x-2
            bg-[#1bac9c] hover:bg-[#1abc9c]/80 hover:scale-95 text-[#fefefe] 
            py-2 px-6 rounded-lg lg:rounded-xl lg:shadow-lg 
            cursor-pointer transition duration-300 ease-in-out"
        >
            {/* Icon */}
            <IoAddCircleOutline
                className="w-5 lg:w-7 h-5 lg:h-7"
            />

            {/* Text */}
            <span className='lg:text-lg font-medium'>
                Create Study Group
            </span>

        </button>
    );
};

export default CreateGroupButton;
