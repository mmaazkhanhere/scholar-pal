import React, { useState } from 'react';

import { IoMdAddCircle, IoMdClose } from "react-icons/io";

type Props = {
    tags: string[],
    setTags: (tags: string[]) => void
}

const Tags = ({ tags, setTags }: Props) => {
    const [addStatus, setAddStatus] = useState<boolean>(false);
    const [tagInput, setTagInput] = useState<string>('');

    const handleAddTagClick = () => {
        if (tagInput && tags.length < 3 && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput('');
            setAddStatus(false)
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTagClick();
        }
    };

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row flex-wrap gap-2">
                {
                    tags.map((tag, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-[#1abc9c] 
                            text-white px-2 py-1 rounded"
                        >
                            {tag}
                            <button

                                onClick={() => removeTag(index)}
                                className="text-sm lg:text-base text-[#343abc] 
                                bg-[#fefefe] rounded-full p-0.5"
                            >
                                <IoMdClose className='w-4 h-4' />
                            </button>
                        </div>
                    ))
                }
            </div>

            {
                addStatus && (
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
                            onClick={handleAddTagClick}
                            className="bg-[#1abc9c] px-2 lg:px-4 lg:py-1
                            text-white text-sm lg:text-base rounded"
                        >
                            Add
                        </button>
                    </div>
                )
            }

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

export default Tags;
