/*An API route for liking a post. It checks if the current user have already like
the post. If so, it removes the user from the liked id list; if not, it appends
the user in the liked id list. */

import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb"
import getCurrentUser from "@/actions/getCurrentUser";


export const POST = async (request: NextRequest) => {

    try {

        const body = await request.json(); //extract the body from the request
        const { postId, userId } = body; //destruct the body

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse('Unauthenticated', { status: 401 })
        }

        if (!postId || !userId) {
            //If there is no user id or post id, it return error 400 response
            return new NextResponse('Missing data', { status: 400 });
        }

        /*It finds the specific post which is supposed to be like by using
        the postId passed in the request body */
        const post = await prismadb.post.findUnique({
            where: {
                id: postId
            },
            select: {
                likedBy: true, //fetch only the like of the posts
                authorId: true,
            }
        })

        if (!post) {
            //if there is no post id, it return error 400 response
            return new NextResponse('No post found', { status: 400 });
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
            },
            select: {
                id: true,
                likedBy: true
            }
        });

        /*Create a notification to the post creator that their post has been liked */
        await prismadb.notification.create({
            data: {
                userId: post.authorId,
                senderId: currentUser?.id,
                body: `${currentUser.name} has liked your post`,
                type: 'LIKE'
            }
        });

        /*Update the post author notification status to true */
        await prismadb.user.update({
            where: {
                id: post.authorId,
            },
            data: {
                hasNotifications: true,
            }
        });

        return NextResponse.json(updatedPost) //the updated post is returned in response

    } catch (error) {
        console.error("LIKE_API_ERROR", error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}