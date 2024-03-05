/*A modal component that displays the UI to create a new post. */

"use client"

import React, { useCallback, useState } from 'react'
import axios from 'axios'

import Modal from '../modal'
import Avatar from '../avatar'
import PostLength from '../posts/post-length'
import NewPostFooter from '../posts/new-post-footer'
import AddTags from '../posts/add-tags'

import usePostModal from '@/hooks/usePostModal'
import useLoginModal from '@/hooks/useLoginModal'
import usePosts from '@/hooks/usePosts'
import useUser from '@/hooks/useUser'

import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'


type Props = {}

const NewPostModal = (props: Props) => {

    const [postContent, setPostContent] = useState<string>(''); /*Content of the
    post */
    const [tags, setTags] = useState<string[]>([]); /*Tags that are assigned
    to the post */

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const { user: currentUser } = useUser();
    const { mutate } = usePosts(currentUser?.id);
    const { mutate: updateAllPosts } = usePosts();

    const handlePostModal = usePostModal();
    const handleLoginModal = useLoginModal();


    /*function that is called when the user submits the modal that makes a post 
    request to create a new post*/
    const handleSubmit = useCallback(async () => {

        try {

            setIsLoading(true);

            const result = await axios.post('/api/posts', { postContent, tags });
            //post request to the api endpoint to create new post

            if (result.status == 200) {
                /*if the post was successfully created, a success notification
                is displayed and all the state variables are reset*/

                successNotification('Post successfully')

                setPostContent('');
                setTags([]);

                mutate(); //manually fetch updated list of posts made
                updateAllPosts();

                setIsLoading(false);

                handlePostModal.onClose(); //close the new post modal
            }

        }
        catch (error) {

            setIsLoading(false)
            console.error('NEW_POST_MODAL_ERROR', error)

            if (axios.isAxiosError(error) && (error.response?.status == 401)) {
                //if user is not authenticated, open the login modal
                errorNotification('Not Authenticated')
                handleLoginModal.onOpen()
            }
            else if (axios.isAxiosError(error) && (error.response?.status == 404)) {
                //if post is empty, display an error notification
                errorNotification('Post is empty')
            }
            else {
                errorNotification('Something went wrong')
            }
        }

    }, [handleLoginModal, handlePostModal, mutate, postContent, tags, updateAllPosts])


    //content of the modal

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

        <Modal
            disabled={isLoading || postContent.length > 250}
            body={modalBody}
            isOpen={handlePostModal.isOpen}
            onClose={handlePostModal.onClose}
            onSubmit={handleSubmit}
            buttonLabel='Post'
        />

    )
}

export default NewPostModal