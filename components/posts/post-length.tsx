import React from 'react';

// Define the types for the props that the component expects
type PostLengthProps = {
    currentLength: number; // The current length of the text content
};

// Function to calculate the stroke dash offset based on the current length and the circle radius
const calculateStrokeDashoffset = (currentLength: number, radius: number) => {
    // The formula calculates how much of the circle's circumference should be visible based on the content length
    return (1 - Math.min(currentLength / 250, 1)) * 2 * Math.PI * radius;
};

// The main component that displays the circular progress indicator
const PostLength: React.FC<PostLengthProps> = ({ currentLength }) => {
    // Define the default SVG size and circle radius
    const circleRadius = 20; // The radius of the circle

    // Calculate the total circumference of the circle (used for the stroke dash array)
    const strokeDasharray = 2 * Math.PI * circleRadius;

    // Calculate the portion of the circle's circumference that should be visible
    const strokeDashoffset = calculateStrokeDashoffset(currentLength, circleRadius);

    // Render the component
    return (
        // Container div to position the text and SVG relative to each other
        <div className='relative w-[50px] h-[50px] lg:w-[30px] lg:h-[30px]'>
            <svg
                width="100%" // Make SVG responsive by setting width to 100% of the container
                height="100%" // Make SVG responsive by setting height to 100% of the container
                viewBox="0 0 50 50" // Set the viewBox to enable scaling of the SVG content
                className="text-center" // Center the SVG content
            >
                <circle
                    cx="25" // Center the circle horizontally in the SVG
                    cy="25" // Center the circle vertically in the SVG
                    r={circleRadius} // Radius of the circle
                    fill="none" // Don't fill the circle
                    stroke={currentLength > 250 ? '#ef4444' : '#10b981'} // Change the stroke color based on the content length
                    strokeWidth="4" // Width of the circle's stroke
                    strokeDasharray={strokeDasharray} // Total length of the stroke dashes (circumference of the circle)
                    strokeDashoffset={strokeDashoffset} // Length of the visible part of the stroke
                />
            </svg>
            <span
                // Position the text in the center of the container div
                className=
                {`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                ${currentLength > 250 ? 'text-red-500' : 'text-green-500'}
                text-sm`} // Set the size of the text
            >
                {/*Display the current length of the text content*/}
                {currentLength}
            </span>
        </div>
    );
};

export default PostLength;
