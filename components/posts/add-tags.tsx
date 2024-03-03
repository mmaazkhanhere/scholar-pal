/*A React component that allow users to add and remove tags within a UI, with
a limited of up to three tags */

import React, { useState } from 'react';

import { IoMdAddCircle, IoMdClose } from "react-icons/io";

type Props = {
    tags: string[], //string of tags of the post
    setTags: (tags: string[]) => void //a function to add tags to the post
}

const AddTags = ({ tags, setTags }: Props) => {

    //a state variable to control whether to sow the input field to add tag
    const [addStatus, setAddStatus] = useState<boolean>(false);

    //stores the current input text for a new tag
    const [tagInput, setTagInput] = useState<string>('');

    // a function to add tags to the tags list
    const handleAddTagClick = () => {

        /*Checks if the 3 tags are added in the list and that the current tag is
        not included in the list*/

        if (tagInput && tags.length < 3 && !tags.includes(tagInput)) {

            setTags([...tags, tagInput]); //add the tags to the list
            setTagInput(''); //reset the state variable
            setAddStatus(false) //hide the input field
        }
    };

    // a function that is called when enter key is pressed. It adds the tag to the list of tags
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTagClick();
        }
    };

    //remove the tag from the list of tags based on its index
    const removeTag = (indexToRemove: number) => {

        /*filters the tags whose current index is not equal to the index remove
        thus all other tags remains there. The underscore is used as a placeholder
        for the element value indicating the value is not relevant. It can
        be replaced with another name */
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
                {
                    tags.map((tag, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-[#1abc9c] 
                            text-white px-2 py-1 rounded"
                        >
                            {tag}

                            {/*Button to remove the tag */}
                            <button

                                onClick={() => removeTag(index)}
                                className="text-sm lg:text-base text-[#343abc] 
                                bg-[#fefefe] rounded-full p-0.5"
                            >
                                <IoMdClose className='w-3 lg:w-4 h-3 lg:h-4' />
                            </button>
                        </div>
                    ))
                }
            </div>

            {
                addStatus && (
                    /*input field and add button */
                    <div className="flex items-center gap-2">

                        {/*Input to enter tag */}
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add a tag..."
                            className="border p-1 rounded flex-1 text-sm lg:text-base"
                        />

                        {/*button to add tag */}
                        <button
                            onClick={handleAddTagClick}
                            className="bg-[#1abc9c] px-2 lg:px-4 lg:py-1
                            text-white text-sm lg:text-base rounded"
                        >
                            Add
                        </button>
                    </div>
                )
            }

            {/*Button to display input field to add a tag */}
            <button
                onClick={() => setAddStatus(!addStatus)}
                disabled={tags.length >= 3}
                className={`w-8 h-8 ${tags.length >= 3 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <IoMdAddCircle
                    aria-label='Add Tag Button'
                    className='fill-[#1abc9c] self-start w-8 h-8'
                />
            </button>


        </div>
    );
};

export default AddTags;
