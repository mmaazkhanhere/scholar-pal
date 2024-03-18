import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const answerId = request.nextUrl.pathname.split('/').pop();

    try {

        if (!answerId) {
            return null;
        }

        const upVoteList = await prismadb.answer.findUnique({
            where: {
                id: answerId
            },
            select: {
                upvotes: true
            }
        })
        if (!upVoteList) {
            return null;
        }

        return NextResponse.json(upVoteList.upvotes)

    } catch (error) {

        console.error('GET_UPVOTE_LIST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}