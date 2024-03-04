/*A react component that is visually intuitive way to indicate the length
of text content against a pre-determined maximum. It uses SVG graphics to create 
a responsive, circular progress indicator that changes color based on whether 
the content length exceeds a specified threshold.   */

import React from 'react';

type PostLengthProps = {
    currentLength: number;
};

const PostLength: React.FC<PostLengthProps> = ({ currentLength }) => {
    // Define SVG sizes for different screens
    const svgSizeLarge = 50; // Size of SVG container for large screens
    const svgSizeSmall = 30; // Size of SVG container for small screens

    // Define circle radii for different screens
    const circleRadiusLarge = 20; // Radius of the circular for large screens
    const circleRadiusSmall = 12; // Radius of the circular for small screens

    /* Calculate stroke dash array and offset based on the screen size, which
    is essential for creating the circular progress effect. It defines the
    pattern of dashes and gaps used to paint the stroke of the circle */
    const strokeDasharrayLarge = 2 * Math.PI * circleRadiusLarge;
    const strokeDasharraySmall = 2 * Math.PI * circleRadiusSmall;

    const strokeDashoffset = (1 - Math.min(currentLength / 250, 1)) * 2 * Math.PI * circleRadiusLarge;
    /*Calculates how much of the circular path is filled based on the current
    length (the length of the a post content) */

    return (
        <div className='relative'>
            <svg
                className="hidden lg:block" // Hide on small screens
                width={svgSizeLarge}
                height={svgSizeLarge}
            >
                <circle
                    cx={svgSizeLarge / 2} /*specifies the x-axis co-ordinate of 
                    the center of the circle*/
                    cy={svgSizeLarge / 2} /*represents the y-axis coordinate of circle */
                    r={circleRadiusLarge} //radius of the circle
                    fill='none'
                    stroke={`${currentLength > 250 ? '#ef4444' : '#10b981'}`}
                    strokeWidth='4'
                    strokeDasharray={strokeDasharrayLarge}
                    strokeDashoffset={strokeDashoffset}
                />
            </svg>
            <svg
                className="block lg:hidden" // Show on small screens
                width={svgSizeSmall}
                height={svgSizeSmall}
            >
                <circle
                    cx={svgSizeSmall / 2}
                    cy={svgSizeSmall / 2}
                    r={circleRadiusSmall}
                    fill='none'
                    stroke={`${currentLength > 250 ? '#ef4444' : '#10b981'}`}
                    strokeWidth='3' // Slightly thinner stroke for smaller circle
                    strokeDasharray={strokeDasharraySmall}
                    strokeDashoffset={(1 - Math.min(currentLength / 250, 1)) * 2 * Math.PI * circleRadiusSmall}
                />
            </svg>

            {/*Current length of the post */}
            <span
                className={`absolute top-1/2 left-1/2 transform 
                -translate-x-1/2 -translate-y-1/2 hidden lg:block 
                ${currentLength > 250 ? 'text-red-500' : 'text-green-500'} 
                text-sm`} // Smaller text size on small screens
            >
                {currentLength}
            </span>
        </div>
    );
};

export default PostLength;
