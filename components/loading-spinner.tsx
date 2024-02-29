import React from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
    spinnerSize?: number
    isLoading?: any
}

const LoadingSpinner = ({ spinnerSize, isLoading }: Props) => {

    const spinnerColor = '#1abc9c'

    return (
        <div className=' mt-28 flex justify-center w-full h-full'>
            <ClipLoader
                color={spinnerColor}
                loading={isLoading}
                size={spinnerSize}
            />
        </div>
    )
}

export default LoadingSpinner