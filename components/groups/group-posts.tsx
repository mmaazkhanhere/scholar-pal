/*A component that fetches all the post of the group*/

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import PostCard from '../posts/post-card'
import LoadingSpinner from '../loading-spinner'

import useGroupPosts from '@/hooks/useGroupPosts'
import useUser from '@/hooks/useUser'

import { IPost } from '@/interface-d'

type Props = {}

const GroupPosts = (props: Props) => {

    const groupId = usePathname().split('/').pop(); /*get the groupId from the url
    path */

    const { data: groupPosts, isLoading } = useGroupPosts(groupId as string);/*get
    the list of group posts */

    const { user: currentUser } = useUser(); //custom hook to fetch the current user

    if (isLoading || !currentUser) {
        {/*Display loading spinner while data is being fetched */ }
        return <LoadingSpinner spinnerSize={75} />
    }


    return (
        <section className='max-w-4xl w-full'>
            {
                groupPosts.length == 0 ? (

                    /*If no post is available a message is displayed that no posts
                    are available else list of groups is displayed */

                    <div className='mt-10 flex justify-center text-xl lg:text-2xl font-medium'>
                        No posts available
                    </div>
                ) : (
                    groupPosts?.map((post: IPost) => (
                        <Link
                            href={`/post/${post.id}`}
                            key={post.id}
                        >
                            <PostCard
                                user={currentUser!}
                                post={post}
                            />
                        </Link>
                    ))
                )
            }
        </section>
    )
}

export default GroupPosts