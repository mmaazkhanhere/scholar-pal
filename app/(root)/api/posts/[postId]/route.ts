import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {
    console.log('API called')

    try {
        const postId = request.nextUrl.pathname.split('/').pop()

        if (!postId) {
            return new NextResponse('Post ID missing', { status: 404 });
        }

        const post = await prismadb.post.findFirst({
            where: {
                id: postId
            },
            include: {
                author: true,
                comments: true
            }
        })

        if (!post) {
            return new NextResponse('Cannot find the post', { status: 400 });
        }

        return NextResponse.json(post);

    } catch (error) {
        console.error('GET_SINGLE_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}