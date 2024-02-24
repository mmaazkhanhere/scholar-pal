import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const GET = async (request: NextRequest) => {
    try {
        const allPosts = await prismadb.post.findMany({
            include: {
                author: true,
                comments: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(allPosts);

    } catch (error) {

    }
}


export const POST = async (request: NextRequest) => {

    try {

        const body = await request.json();
        const { postContent, tags } = body;

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return new NextResponse('Not authenticated', { status: 401 });
        }

        if (!postContent) {
            return new NextResponse('No Content', { status: 404 });
        }

        const post = await prismadb.post.create({
            data: {
                authorId: currentUser.id,
                content: postContent,
                tags: tags || [],
                likedBy: [],
            }
        })

        return NextResponse.json(post)

    } catch (error) {
        console.error('POST_API_ERROR', error);
        return new NextResponse('Server Error', { status: 500 })
    }

}