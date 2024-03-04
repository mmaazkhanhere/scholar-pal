/*A react component designed for uploading and displaying images, using the
react dropzone library for drag and drop functionality */

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone';


type Props = {
    onChange: (base64: string) => void; /*function that is called with the base64
    encoded string of the image uploaded image. Allows the parent component
    to be notified of and react to upload the image */
    label: string; //text displaying in the dropzone
    value?: string; //a  base64 encoded representation of the image
    disabled?: boolean; //optional parameter that disables the dropzone if true
}

const ImageUpload: React.FC<Props> = ({ onChange, label, value, disabled }) => {

    const [base64, setBase64] = useState(value) /*base64 is an encoding scheme
    that converts binary data into text format */

    /*a callback function that invokes the onChange prop with the base64 string
    of the uploaded image. It is often used to embed files images, font, and audio
    directly into HTML or CSS files which eliminates the need for additional 
    HTTP request to load these assets*/

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange])

    /*A callback function that handles the dropping of files onto the dropzone.
    It reads the first file using FileReader, converts it to a base64-encoded
    string, and updates the components state and notifies the parent through
    handleChange */

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }
        reader.readAsDataURL(file);
    }, [handleChange])

    /*these functions are provided by the react-dropzone library that is spread
    onto the dropzone and the input elements, allowing files to be dropped on to
    them or display a a file selection dialog */

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, //maximum number of files to display
        onDrop: handleDrop, //function to call when the image is dropped
        disabled, //disabled the dropzone when disabled prop is true
        accept: { //types of images to accept
            'image/jpeg': [],
            'image/png': [],
        }
    })

    return (
        <div
            {...getRootProps({
                className: `w-44 h-44 text-[#343a40] text-center 
        border-2 border-dotted rounded-full border-neutral-700
        cursor-pointer self-center flex items-center justify-center`})}
        >
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className='flex items-center justify-center'>
                        <Image
                            src={base64}
                            alt='Uploaded Image'
                            height={100}
                            width={100}
                        />
                    </div>
                ) : (
                    <p>{label}</p>
                )
            }
        </div>
    )
}

export default ImageUpload