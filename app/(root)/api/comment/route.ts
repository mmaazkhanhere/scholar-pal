/*An api route for managing comments associated with a post using prisma orm 
for database management. It includes a POST request to make a comment and a
GET request to get the comment made on a post */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

// makes a GET HTTP request to get all comments made on a post using a post id

export const GET = async (request: NextRequest) => {
    try {

        const postId = request.nextUrl.searchParams.get('postId'); /*Search
        the url for query parameter postId */

        if (!postId) {
            //if no postId exists, return an error response
            return new NextResponse('Missing post id', { status: 404 });
        }

        /*Find all the comments on post with postId and include the details of 
        the author who made the comment. Only fetching specific data to optimize
        the performance */
        const postComment = await prismadb.comment.findMany({
            where: { postId: postId },
            select: {
                createdAt: true,
                content: true,
                author: {
                    select: {
                        name: true,
                        profilePicture: true,
                        username: true,
                    }
                }
            }
        });

        return NextResponse.json(postComment) //return the comment made on the post

    } catch (error) {
        console.error('COMMENT_GET_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export const POST = async (request: NextRequest) => {

    const body = await request.json(); //extract the body from the request
    const { currentUserId, postAuthorId, postId, content } = body //destruct the body

    try {
        if (!currentUserId || !postId || !postAuthorId) {
            //if there is no user or postId, return an empty response
            return new NextResponse('Missing data', { status: 400 })
        }

        /*Creates a comment with prisma create parameter with the data passed
        as an object using data query. Only data that is necessary is selected
        to minimize the payload size */
        const comment = await prismadb.comment.create({
            data: {
                postId: postId,
                content: content,
                authorId: currentUserId
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        profilePicture: true
                    }
                }
            }
        });

        await prismadb.notification.create({
            data: {
                userId: postAuthorId,
                senderId: comment.author.id,
                body: `${comment.author.name} has made a comment on your post`,
                type: 'COMMENT'
            }
        }) //create notification to the post author that a comment has been made 

        await prismadb.user.update({
            where: {
                id: postAuthorId,
            },
            data: {
                hasNotifications: true,
            }
        }) //update the post author notification status indicating that they have notification

        return NextResponse.json(comment) //return the comment json response

    } catch (error) {
        console.error('COMMENT_API_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}