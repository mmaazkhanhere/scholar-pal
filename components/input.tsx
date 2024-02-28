/*A react input component that takes optional parameters to control its
appearance */

import React, { ChangeEventHandler } from 'react'

type Props = {
    placeholder?: string;
    value?: string | number; //the variable to which the input value will be assigned
    type?: string; //type of input entered
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string; //label for the input
    disabled?: boolean; //disable the input element
}

const Input: React.FC<Props> = ({ placeholder, value, type, onChange, label, disabled }) => {
    return (
        <div className='w-full flex flex-col gap-2'>
            {
                label && (
                    <span className='lg:text-xl font-semibold'>
                        {label}
                    </span>
                )
            }
            <input
                placeholder={placeholder}
                onChange={onChange}
                type={type}
                value={value}
                disabled={disabled}
                className='w-full py-2 px-4 border-1.5 border-[#343a40] rounded-xl
                transition duration-500 border
                focus:border-[#1abc9c] disabled:opacity-70
                disabled:cursor-not-allowed'
            />
        </div>
    )
}

export default Input