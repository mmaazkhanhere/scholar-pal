import React from 'react';

type PostLengthProps = {
    currentLength: number;
};

const PostLength: React.FC<PostLengthProps> = ({ currentLength }) => {
    // Define SVG sizes for different screens
    const svgSizeLarge = 50; // Size for large screens
    const svgSizeSmall = 30; // Size for small screens

    // Define circle radii for different screens
    const circleRadiusLarge = 20; // Radius for large screens
    const circleRadiusSmall = 12; // Radius for small screens

    // Calculate stroke dash array and offset based on the screen size
    const strokeDasharrayLarge = 2 * Math.PI * circleRadiusLarge;
    const strokeDasharraySmall = 2 * Math.PI * circleRadiusSmall;

    const strokeDashoffset = (1 - Math.min(currentLength / 250, 1)) * 2 * Math.PI * circleRadiusLarge;

    return (
        <div className='relative'>
            <svg
                className="hidden lg:block" // Hide on small screens
                width={svgSizeLarge}
                height={svgSizeLarge}
            >
                <circle
                    cx={svgSizeLarge / 2}
                    cy={svgSizeLarge / 2}
                    r={circleRadiusLarge}
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
