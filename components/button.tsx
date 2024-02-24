import React, { ReactNode } from 'react';

type Props = {
    label?: string;
    secondary?: boolean;
    onClick: () => void;
    disabled?: boolean;
    large?: boolean;
    ariaLabel?: string;
    className?: string;
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
            {icon && <span className="flex items-center">{icon}</span>}
            {label}
        </button>
    );
};

export default Button;
