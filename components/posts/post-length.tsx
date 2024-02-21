import React from 'react';

type PostLengthProps = {
    currentLength: number;
};

const PostLength: React.FC<PostLengthProps> = ({ currentLength }) => {
    // Ensure the SVG is large enough to contain the circle without clipping
    const svgSize = 50; // Example size, adjust as needed
    const circleRadius = 20; // Adjust the radius as needed

    return (
        <div className='relative self-end' style={{ width: svgSize, height: svgSize }}>
            <svg width={svgSize} height={svgSize}>
                <circle
                    cx={svgSize / 2}
                    cy={svgSize / 2}
                    r={circleRadius}
                    fill='none'
                    stroke={`${currentLength > 250 ? '#ef4444' : '#10b981'}`}
                    strokeWidth='4' // Adjust stroke width as needed
                    strokeDasharray={2 * Math.PI * circleRadius}
                    strokeDashoffset={
                        (1 - Math.min(currentLength / 250, 1)) * 2 * Math.PI * circleRadius
                    }
                />
            </svg>
            <span
                className={`absolute top-1/2 left-1/2 transform 
                -translate-x-1/2 -translate-y-1/2 
                ${currentLength > 250 ? 'text-red-500' : 'text-green-500'} 
                font-semibold text-sm hidden lg:block`}
            >
                {currentLength}
            </span>
        </div>
    );
};

export default PostLength;
