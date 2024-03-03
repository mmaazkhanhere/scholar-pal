/*A react component to display all the comments made on a post */

import React from 'react';
import Link from 'next/link';

import CommentCard from './comment-card';

import { IComment, IPost } from '@/interface-d';

import useComments from '@/hooks/useComments';


type Props = {
    post: IPost; //details of the post
    isPostPage?: boolean; /*an optional parameter that checks if the comment
    is displayed on post page. */
};

const CommentFeed = ({ post, isPostPage }: Props) => {

    const { data: comments = [] } = useComments(post.id); /*use a custom 
    react hook to fetch all the comment of the post by passing post id to the
    hook */

    /*If user is on post page display all the comment or else display only three
    comments */
    const displayedComments = isPostPage ? comments : comments.slice(0, 3);


    return (
        <section className='max-w-3xl w-full'>
            {/*If on post page, display all comments*/}
            {
                displayedComments.map((comment: IComment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))
            }

            {/*If not on user page, and comments made are more than 3, then 
            display only three comments */}
            {
                !isPostPage && comments.length > 3 && (
                    <div
                        className="text-center text-[#1abc9c] hover:underline
                    hover:text-[#1abc9c]/60 mt-2 text-sm font-semibold"
                    >
                        <Link href={`/post/${post.id}`}>
                            Load more comments
                        </Link>
                    </div>
                )}
        </section>
    );
};

export default CommentFeed;
