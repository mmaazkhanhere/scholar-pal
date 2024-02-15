import React from 'react'

type Props = {
    label: string
    secondary?: boolean
    onClick: () => void
    disabled?: boolean
    large?: boolean
    ariaLabel?: string
}

const Button: React.FC<Props> = ({ label, secondary, onClick, disabled, large, ariaLabel }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`
            disabled:opacity-75 disabled:cursor-not-allowed rounded-xl font-semibold
            transition duration-500 hover:scale-95 hover:opacity-75
            ${secondary ? 'border-2 border-[#343a40] bg-transparent' : 'bg-[#1abc9c]'}
            ${large ? 'px-5 py-3' : 'px-4 py-2'}
        `}
        >
            {label}
        </button>
    )
}

export default Button