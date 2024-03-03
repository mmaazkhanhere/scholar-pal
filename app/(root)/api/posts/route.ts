/* An API route to work with the posts, allowing retrieval of all posts
and creating new post. It includes an HTTP request that gets all the 
posts that are available. It has a POST request that create a new post.
This route is used to create a new post for the homepage feed
 */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const GET = async (request: NextRequest) => {

    try {
        /*Gets all the post using the Prisma findMany query and include the
        post creator data along with all the comments made on the post. The posts
        are ordered in descending order, placing the latest post on the top */

        const allPosts = await prismadb.post.findMany({
            include: {
                author: true,
                comments: true,
            },
            orderBy: {
                createdAt: 'desc'/*order the post in descending order of the time 
                they were published*/
            }
        })

        return NextResponse.json(allPosts); //returns all the posts

    } catch (error) {
        console.error('GET_ALL_POSTS_API_ERROR', error);
        return new NextResponse('Server Error', { status: 500 })
    }
}


export const POST = async (request: NextRequest) => {

    try {
        /*
        Todos: Add functionality to upload media files
        Todos: Ability to delete post
         */

        const body = await request.json(); //extract body from request
        const { postContent, tags } = body; //destruct the body

        const currentUser = await getCurrentUser() //get the current signed in user

        if (!currentUser) {
            //If there is no sign in user, not authenticated error is returned
            return new NextResponse('Not authenticated', { status: 401 });
        }

        if (!postContent) {
            //If the post is empty, 404 status code is returned
            return new NextResponse('No Content', { status: 404 });
        }

        //creates a new post using Prisma create query
        const post = await prismadb.post.create({
            data: {
                authorId: currentUser.id,
                content: postContent,
                tags: tags || [], //tags are either tag passed in body or empty array
                likedBy: [] //likes list is set to empty array indicating no one have like did
            }
        })

        return NextResponse.json(post) //return the post in json

    } catch (error) {
        console.error('POST_API_ERROR', error);
        return new NextResponse('Server Error', { status: 500 })
    }

}