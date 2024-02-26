import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb"

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { postId, userId } = body;

        if (!postId || !userId) {
            return new NextResponse('Missing data', { status: 400 });
        }

        const post = await prismadb.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!post) {
            return new NextResponse('No post found', { status: 400 })
        }

        let postLikes: string[] = [...post.likedBy] || []

        if (postLikes.includes(userId)) {
            postLikes = postLikes.filter((likeId) => likeId !== userId); // Correctly updates postLikes
        } else {
            postLikes.push(userId);
        }


        const updatedPost = await prismadb.post.update({
            where: {
                id: postId
            },
            data: {
                likedBy: postLikes
            }
        })

        return NextResponse.json(updatedPost)

    } catch (error) {
        console.error("LIKE_API_ERROR", error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}