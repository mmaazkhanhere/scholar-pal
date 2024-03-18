import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const answerId = request.nextUrl.pathname.split('/').pop();

    try {

        if (!answerId) {
            return null;
        }

        const downVoteList = await prismadb.answer.findUnique({
            where: {
                id: answerId
            },
            select: {
                downvotes: true
            }
        })
        if (!downVoteList) {
            return null;
        }

        return NextResponse.json(downVoteList.downvotes)

    } catch (error) {

        console.error('GET_DOWNVOTE_LIST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}