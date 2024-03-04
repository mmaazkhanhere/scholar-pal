/*A react component that displays the social media icons of user social media
profiles. They are conditionally rendered depending on the availability of their
social media profiles*/

import Link from 'next/link';
import React from 'react'

import { FaSquareFacebook, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

type Props = {
    facebookUrl?: string; //link to Facebook profile
    twitterUrl?: string; //link to Twitter profile
    linkedinUrl?: string; //link to linkedin profile
}

const SocialMediaLink = ({ facebookUrl, twitterUrl, linkedinUrl }: Props) => {

    return (
        <section className='flex items-center justify-start gap-x-4 my-5'>

            {/*Facebook Icon */}
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

            {/*Twitter Icon */}
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

            {/*LinkedIn Icon */}
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
        </section>
    )
}

export default SocialMediaLink