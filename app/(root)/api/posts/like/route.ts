/*An API route for liking a post. It checks if the current user have already like
the post. If so, it removes the user from the liked id list; if not, it appends
the user in the liked id list. */

import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb"


export const POST = async (request: NextRequest) => {

    try {

        const body = await request.json(); //extract the body from the request
        const { postId, userId } = body; //destruct the body

        if (!postId || !userId) {
            //If there is no user id or post id, it return error 400 response
            return new NextResponse('Missing data', { status: 400 });
        }

        /*It finds the specific post which is supposed to be like by using
        the postId passed in the request body */
        const post = await prismadb.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!post) {
            //if there is no post id, it return error 400 response
            return new NextResponse('No post found', { status: 400 })
        }

        let postLikes: string[] = [...post.likedBy] || [] /*It creates a shallow
        copy of the likes of the post which, if not liked by anyone, will be
        an empty string */

        if (postLikes.includes(userId)) {
            /* If postLike includes the user id passed in the body, it removes
            the user from the list of user who have liked the post*/
            postLikes = postLikes.filter((likeId) => likeId !== userId);
        } else {
            //if the user doesnt exists in the list, it adds the user to the list
            postLikes.push(userId);
        }

        /*The post likedBy fields is updated by first finding that specific post
        and then updating its likedBY fields */
        const updatedPost = await prismadb.post.update({
            where: {
                id: postId
            },
            data: {
                likedBy: postLikes
            }
        })

        return NextResponse.json(updatedPost) //the updated post is returned in response

    } catch (error) {
        console.error("LIKE_API_ERROR", error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}