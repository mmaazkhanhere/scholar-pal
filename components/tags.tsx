import React from 'react'

type Props = {
    tags: string[]
}

const Tags = ({ tags }: Props) => {
    return (
        <div className='flex items-center justify-start gap-x-5'>
            {
                tags.map((tag: string) => (
                    <article
                        key={tag}
                        className='bg-[#1abc9c]/60 text-white px-4 lg:px-6 
                        rounded-lg py-1 text-sm lg:text-base'
                    >
                        {tag}
                    </article>
                ))
            }
        </div>
    )
}

export default Tags