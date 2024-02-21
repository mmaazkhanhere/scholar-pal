/*A button react component that takes optional parameter to control its appearance
and behavior */

import React from 'react'

type Props = {
    label: string //text of the button
    secondary?: boolean //checks if the type of button is secondary
    onClick: () => void //function that is called when the button is clicked
    disabled?: boolean //disables the button
    large?: boolean //checks if the button is large
    ariaLabel?: string //aria label for the button
    className?: string //additional styling if required
}

const Button: React.FC<Props> = ({ label, secondary, onClick, disabled, large, ariaLabel, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={` ${className} disabled:opacity-75 disabled:cursor-not-allowed 
            rounded-xl font-semibold transition duration-500 hover:scale-95 
            hover:opacity-75
            ${secondary ? 'border-2 border-[#343a40] bg-transparent' : 'bg-[#1abc9c] text-white'}
            ${large && 'px-6 py-3'
                }
        `}
        >
            {label}
        </button>
    )
}

export default Button