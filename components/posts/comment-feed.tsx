import { IComment, IPost } from '@/interface-d';
import React from 'react';
import CommentCard from './comment-card';
import useComments from '@/hooks/useComments';
import Link from 'next/link'; // Import Link from Next.js for navigation

type Props = {
    post: IPost;
};

const CommentFeed = ({ post }: Props) => {
    const { data: comments = [] } = useComments(post.id);
    const showComments = comments.slice(0, 3); // Only take the first three comments

    return (
        <section className='max-w-3xl w-full'>
            {
                showComments.map((comment: IComment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))
            }
            {
                comments.length > 3 && (
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
