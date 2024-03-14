/*A react component that represents the modal to create post in a specific group */

"use client"

import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation'

import Modal from '../modal'
import Avatar from '../avatar'
import AddTags from '../posts/add-tags'
import NewPostFooter from '../posts/new-post-footer'
import PostLength from '../posts/post-length'

import useLoginModal from '@/hooks/useLoginModal'
import useGroupPosts from '@/hooks/useGroupPosts'
import useGroup from '@/hooks/useGroup'
import useGroupPostModal from '@/hooks/useGroupPostModal'
import useUser from '@/hooks/useUser'

import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'


type Props = {}

const GroupPostModal = (props: Props) => {

    const [postContent, setPostContent] = useState<string>(''); /*Content of the
    post */
    const [tags, setTags] = useState<string[]>([]); /*Tags that are assigned
    to the post */
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const groupId = usePathname().split('/').pop(); //get the group id from the url path

    const { user: currentUser } = useUser(); //fetch current user
    const { isOpen, onClose: closeGroupPostModal } = useGroupPostModal(); /*hook
    to open and close the group post modal */

    const { data: groupDetail, mutate: updateGroup } = useGroup(groupId as string)
    //hook to fetch group detail and mutate function to update the group

    const { mutate: updateGroupPosts } = useGroupPosts(groupId as string);
    //hook with mutate function to fetch the group update posts

    const { onOpen: openLoginModal } = useLoginModal(); //open login modal

    /*function that is called with post button is clicked on. It makes a POST
    HTTP request at specified endpoint to create a post. AFter successful 
    posting, a success notification is displayed with updated data being fetched */
    const handleSubmit = useCallback(async () => {

        try {

            setIsLoading(true);

            const creatorId = groupDetail?.creatorId
            const result = await axios.post(`/api/group/posts/${groupId}`, { postContent, tags, groupId, creatorId });
            //post request to the api endpoint to create new post

            if (result.status == 200) {

                successNotification('Post successfully') //success notification

                //reset state variables
                setPostContent('');
                setTags([]);
                setIsLoading(false);

                //fetch updated data
                updateGroupPosts();
                updateGroup();
                closeGroupPostModal();
            }

        }
        catch (error) {

            //handle error and display error notifications

            setIsLoading(false)
            console.error('NEW_POST_MODAL_ERROR', error)

            if (axios.isAxiosError(error) && (error.response?.status == 401)) {
                //if user is not authenticated, open the login modal
                errorNotification('Not Authenticated')
                openLoginModal();
            }
            else if (axios.isAxiosError(error) && (error.response?.status == 404)) {
                //if post is empty, display an error notification
                errorNotification('Post is empty')
            }
            else {
                errorNotification('Something went wrong')
            }
        }

    }, [closeGroupPostModal, groupDetail?.creatorId, groupId, openLoginModal, postContent, tags, updateGroup, updateGroupPosts])

    /*Body of the modal */
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
                title={`New Post in ${groupDetail?.groupName} Study Group`}
                isOpen={isOpen}
                body={modalBody}
                onClose={closeGroupPostModal}
                onSubmit={handleSubmit}
                buttonLabel='Post'
            />
        </section>
    )
}

export default GroupPostModal;                                                        