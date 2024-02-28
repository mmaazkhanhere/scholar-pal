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
        <div className='flex items-center justify-start gap-x-4'>
            {
                facebookUrl && <Link
                    aria-label='Facebook Profile Link'
                    title='Facebook Profile'
                    href={facebookUrl}
                >
                    <FaSquareFacebook />
                </Link>
            }
            {
                twitterUrl && <Link
                    aria-label='Twitter Profile Link'
                    title='Twitter Profile'
                    href={twitterUrl}
                >
                    <FaSquareXTwitter />
                </Link>
            }
            {
                linkedinUrl && <Link
                    aria-label='LinkedIn Profile Link'
                    title='LinkedIn Profile'
                    href={linkedinUrl}
                >
                    <FaLinkedin />
                </Link>
            }
        </div>
    )
}

export default SocialMediaLink