import { IComment, IPost } from '@/interface-d'
import React from 'react'
import CommentCard from './comment-card'
import useComments from '@/hooks/useComments'

type Props = {
    post: IPost
}

const CommentFeed = ({ post }: Props) => {

    const { data: comments = [] } = useComments(post.id)

    return (
        <section className='max-w-3xl w-full'>
            {
                comments.map((comment: IComment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                    />
                ))
            }
        </section>
    )
}

export default CommentFeed