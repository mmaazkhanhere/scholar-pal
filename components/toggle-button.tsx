/*A react component that is a custom-made toggle switch designed to visually 
indicate and change a boolean state, in this case, whether tutoring is available. */

import React from 'react';

type Props = {
    variableToToggle: boolean //A boolean prop indicating whether tutoring is available
    onChange: () => void; //function when called, toggle the state of button
};

const ToggleButton = ({ onChange, variableToToggle }: Props) => {

    return (
        <button
            onClick={onChange}
            className={`relative inline-flex items-center justify-start 
            w-12 h-6 rounded-full p-1 duration-300 ease-in-out
            ${variableToToggle ? 'bg-[#1abc9c]' : 'bg-gray-300'}`}
        >
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md 
                transform duration-300 ease-in-out
                ${variableToToggle ? 'translate-x-6' : '-translate-x-1'}`}
            ></div>
        </button>
    );
};

export default ToggleButton;
