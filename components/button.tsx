/*A customizable react button component designed for flexibility across different
part of the application. It supports various props to customize its appearance
and behavior, making it reusable */

import React, { ReactNode } from 'react';

type Props = {
    label?: string; //text displayed on the button.
    secondary?: boolean; //A boolean, when true, applies a secondary button styles
    onClick: () => void; //function called when the button is clicked
    disabled?: boolean; //A boolean, when true, prevents clicks and changing its style
    large?: boolean; //boolean, when true, makes a large button
    ariaLabel?: string; //provides a label for screen reader users
    className?: string; //custom class passed to the button
    icon?: ReactNode; // Accepts a ReactNode for the icon
}; ``

const Button: React.FC<Props> = ({ label, secondary, onClick, disabled, large, ariaLabel, className, icon }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`
                ${className}
                inline-flex items-center justify-center gap-2 rounded-xl font-semibold
                transition ease-in-out duration-300
                ${secondary ? 'border-2 border-gray-400 text-gray-700 bg-transparent hover:bg-gray-100' : 'bg-[#1abc9c] text-white hover:bg-[#1abc9c]/80'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
                ${large ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1abc9c] 
            `}
        >
            {/*If icon is provided, display the icon */}
            {icon && <span className="flex items-center">{icon}</span>}
            {label}
        </button>
    );
};

export default Button;
