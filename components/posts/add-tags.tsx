import React, { useState } from 'react';
// Importing icons from react-icons for visual elements
import { IoMdAddCircle, IoMdClose } from "react-icons/io";

// Defining the types for the props passed to the AddTags component
type Props = {
    tags: string[], // Array of tag strings
    setTags: (tags: string[]) => void // Function to update the tags array
}

// The AddTags component allows users to add and remove tags, with a limit of up to three tags
const AddTags = ({ tags, setTags }: Props) => {

    // State to manage the visibility of the input field for adding a new tag
    const [addStatus, setAddStatus] = useState<boolean>(false);

    // State to store the current input value for a new tag
    const [tagInput, setTagInput] = useState<string>('');


    // Function to handle the addition of a new tag
    const handleAddTagClick = () => {
        // Checks if the input is not empty, less than 3 tags are already added, and the tag is not already in the list

        if (tagInput && tags.length < 3 && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]); // Adds the new tag to the tags array
            setTagInput(''); // Resets the input field
            setAddStatus(false) // Hides the input field after adding the tag
        }
    };


    // Function to handle the "Enter" key event in the input field for adding tags
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTagClick(); // Calls the add tag function when the Enter key is pressed
        }
    };


    // Function to remove a tag from the list based on its index
    const removeTag = (indexToRemove: number) => {
        // Filters out the tag that matches the index to remove
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <section className="flex flex-col gap-2">
            {/* Displaying the current tags as a list */}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-[#1abc9c] 
                        text-white px-2 py-1 rounded"
                    >
                        {tag} {/* Displaying the tag */}

                        {/* Button to remove a tag */}
                        <button
                            aria-label='Button to Remove Tag'
                            title='Remove Tag'
                            onClick={() => removeTag(index)}
                            className="text-sm lg:text-base text-[#343abc] 
                            bg-[#fefefe] rounded-full p-0.5"
                        >
                            <IoMdClose className='w-3 lg:w-4 h-3 lg:h-4' />
                        </button>
                    </div>
                ))}
            </div>

            {/* Input field and Add button are shown based on addStatus state */}
            {addStatus && (
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a tag..."
                        className="border p-1 rounded flex-1 text-sm lg:text-base"
                    />
                    <button
                        aria-label='Add Tag Button'
                        title='Add Tag'
                        onClick={handleAddTagClick}
                        className="bg-[#1abc9c] px-2 lg:px-4 lg:py-1
                        text-white text-sm lg:text-base rounded"
                    >
                        Add {/* Button text */}
                    </button>
                </div>
            )}

            {/* Button to toggle the addStatus, showing or hiding the input field */}
            <button
                onClick={() => setAddStatus(!addStatus)}
                disabled={tags.length >= 3} // Disabled if there are already 3 tags
                className={`w-8 h-8 ${tags.length >= 3 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <IoMdAddCircle
                    aria-label='Add Tag Button'
                    className='fill-[#1abc9c] self-start w-8 h-8'
                />
            </button>
        </section>
    );
};

export default AddTags;
