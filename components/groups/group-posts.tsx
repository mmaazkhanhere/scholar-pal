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

    const groupId = usePathname().split('/').pop();

    const { data: groupPosts, isLoading } = useGroupPosts(groupId as string);

    const { user: currentUser } = useUser(); //custom hook to fetch the current user

    if (isLoading || !currentUser) {
        return <LoadingSpinner spinnerSize={75} />
    }


    return (
        <section className='max-w-4xl w-full'>
            {
                groupPosts.length == 0 ? (
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