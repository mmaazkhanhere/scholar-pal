/*This is an api route that fetches all posts of a specific user which is passed
to the route in its url */

import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export const GET = async (request: NextRequest) => {

    try {

        const userId = request.nextUrl.pathname.split('/').pop()
        //extracts the userId from the request url

        if (!userId) {
            //if the userId doesn't exists, it return 400 error status response
            return new NextResponse('User ID missing', { status: 400 });
        }

        /*Finds all the post where the creator of the post is the user passed in
        the url. It includes all the author data and the comments made on the post.
        The post are ordered in descending order, bringing the latest post on
        the top */

        const posts = await prismadb.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: {
                    select: {
                        name: true,
                        username: true,
                        profilePicture: true,
                        id: true
                    }
                },
                comments: {
                    select: {
                        author: {
                            select: {
                                name: true,
                                username: true,
                                profilePicture: true,
                                id: true
                            }
                        }
                    }
                },

            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(posts) //returns the posts of the user

    } catch (error) {
        console.error("GET_USER_POST_ERROR", error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}