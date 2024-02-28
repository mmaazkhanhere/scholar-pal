import Link from 'next/link';
import React from 'react'

import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

type Props = {
    facebookUrl?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
}

const SocialMediaLink = ({ facebookUrl, twitterUrl, linkedinUrl }: Props) => {
    return (
        <div className='flex items-center justify-start gap-x-4 my-5'>
            {
                facebookUrl && <Link
                    aria-label='Facebook Profile Link'
                    title='Facebook Profile'
                    href={facebookUrl}
                >
                    <FaSquareFacebook
                        className='w-8 lg:w-10 h-8 lg:h-10 hover:opacity-80 
                        transition duration-300'
                    />
                </Link>
            }
            {
                twitterUrl && <Link
                    aria-label='Twitter Profile Link'
                    title='Twitter Profile'
                    href={twitterUrl}
                >
                    <FaSquareXTwitter className='w-8 lg:w-10 h-8 lg:h-10 hover:opacity-80 
                        transition duration-300' />
                </Link>
            }
            {
                linkedinUrl && <Link
                    aria-label='LinkedIn Profile Link'
                    title='LinkedIn Profile'
                    href={linkedinUrl}
                >
                    <FaLinkedin className='w-8 lg:w-10 h-8 lg:h-10 hover:opacity-80 
                        transition duration-300' />
                </Link>
            }
        </div>
    )
}

export default SocialMediaLink