
import React from 'react';
import Link from 'next/link';

import CommentCard from './comment-card';

import { IComment, IPost } from '@/interface-d';

import useComments from '@/hooks/useComments';


type Props = {
    post: IPost;
    isPostPage?: boolean;
};

const CommentFeed = ({ post, isPostPage }: Props) => {
    const { data: comments = [] } = useComments(post.id);

    const displayedComments = isPostPage ? comments : comments.slice(0, 3);
    return (
        <section className='max-w-3xl w-full'>
            {
                displayedComments.map((comment: IComment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))
            }
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
