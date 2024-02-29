import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export const GET = async (request: NextRequest) => {

    try {

        const userId = request.nextUrl.pathname.split('/').pop()

        if (!userId) {
            return new NextResponse('User ID missing', { status: 400 });
        }

        const posts = await prismadb.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(posts)

    } catch (error) {
        console.error("GET_USER_POST_ERROR", error)
        return new NextResponse('Interal Server Error', { status: 500 })
    }
}