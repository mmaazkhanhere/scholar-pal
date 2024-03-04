/*A react component that displays a loading spinner using react-spinner library
to indicate that data is being fetched or a operations is in progress */

import React from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
    spinnerSize?: number //size of the spinner
    isLoading?: any
}

const LoadingSpinner = ({ spinnerSize, isLoading }: Props) => {

    const spinnerColor = '#1abc9c' //color the spinner

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