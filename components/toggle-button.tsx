
import React from 'react';

type Props = {
    tutoringAvailable: boolean
    onChange: () => void;
};

const ToggleButton = ({ onChange, tutoringAvailable }: Props) => {

    return (
        <button
            onClick={onChange}
            className={`relative inline-flex items-center justify-start 
            w-12 h-6 rounded-full p-1 duration-300 ease-in-out
            ${tutoringAvailable ? 'bg-[#1abc9c]' : 'bg-gray-300'}`}
        >
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md 
                transform duration-300 ease-in-out
                ${tutoringAvailable ? 'translate-x-6' : '-translate-x-1'}`}
            ></div>
        </button>
    );
};

export default ToggleButton;
