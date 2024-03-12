"use client"

import React, { useState } from 'react'
import Modal from '../modal'
import useGroupPostModal from '@/hooks/useGroupPostModal'
import useUser from '@/hooks/useUser'
import Avatar from '../avatar'
import AddTags from '../posts/add-tags'
import NewPostFooter from '../posts/new-post-footer'
import PostLength from '../posts/post-length'

type Props = {}

const GroupPostModal = (props: Props) => {

    const [postContent, setPostContent] = useState<string>(''); /*Content of the
    post */
    const [tags, setTags] = useState<string[]>([]); /*Tags that are assigned
    to the post */

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const { user: currentUser } = useUser();

    const { isOpen, onClose: closeGroupPostModal } = useGroupPostModal();

    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-y-5'>

            {/*Avatar and name */}
            <div className='flex items-center justify-start gap-x-5'>
                {/*Avatar */}
                <Avatar
                    isNavigable={false}
                    isPostAvatar
                    userId={currentUser?.id}
                    profilePicture={currentUser?.profilePicture}
                />

                {/*Name */}
                <span className='text-xl lg:text-2xl font-bold'>
                    {currentUser?.name}
                </span>
            </div>

            {/*Content of the post, its tags, modal footer and length of
            the post */}
            <div className='flex flex-col items-start w-full gap-y-4'>
                {/*Post content */}
                <textarea
                    value={postContent}
                    onChange={(event) => setPostContent(event.target.value)}
                    placeholder='What is on your mind?'
                    minLength={100}
                    className='min-h-[200px] lg:min-h-[150px] w-full p-2 overflow-y-auto
                        placeholder:text-lg lg:placeholder:text-xl border 
                        rounded-xl text-lg lg:text-xl focus:outline-none'
                    disabled={isLoading}
                />

                {/*Tags */}
                <AddTags tags={tags} setTags={setTags} />

                {/*Footer and length of the post */}
                <div className='flex items-center justify-between w-full'>
                    <NewPostFooter />
                    <PostLength currentLength={postContent.length} />
                </div>
            </div>
        </div>
    )


    return (
        <section>
            <Modal
                isOpen={isOpen}
                body={modalBody}
                onClose={closeGroupPostModal}
                onSubmit={() => console.log('')}
                buttonLabel='Post'
            />
        </section>
    )
}

export default GroupPostModal