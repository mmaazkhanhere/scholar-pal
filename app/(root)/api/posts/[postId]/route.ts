/*An API route to get the details of a specific post. It is used to display a
detailed comments of a post if it has more than 3 comments */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    try {
        const postId = request.nextUrl.pathname.split('/').pop() /*extract
        the postId from the request path using pop method. Since, pop removes the
        last item and postId is included in the last, so pop is used */


        if (!postId) {
            //if no postId exists in the request path, return error response
            return new NextResponse('Post ID missing', { status: 404 });
        }

        /* finds the specific post in the database using the postId and include
        author and comments detail associated with it.*/

        const post = await prismadb.post.findFirst({
            where: {
                id: postId //find the post where id is equal to the postId
            },
            include: {
                author: true, //include the author of the post
                comments: true //include the comments made on the post
            }
        })

        if (!post) {
            //if no post found, return 400 status code
            return new NextResponse('Cannot find the post', { status: 400 });
        }

        return NextResponse.json(post); //else return the post in json

    } catch (error) {
        console.error('GET_SINGLE_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}