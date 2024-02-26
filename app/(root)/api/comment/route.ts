import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {
    try {

        const postId = request.nextUrl.searchParams.get('postId');

        if (!postId) {
            return new NextResponse('Missing post id', { status: 404 });
        }

        const postComment = await prismadb.comment.findMany({
            where: {
                postId: postId
            },
            include: {
                author: true
            }
        })

        return NextResponse.json(postComment)

    } catch (error) {
        console.error('COMMENT_GET_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const { currentUser, postId, content } = body

    try {
        if (!currentUser || !postId) {
            return new NextResponse('Missing data', { status: 404 })
        }

        const comment = await prismadb.comment.create({
            data: {
                postId: postId,
                content: content,
                authorId: currentUser
            }
        })

        return NextResponse.json(comment)

    } catch (error) {
        console.error('COMMENT_API_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}