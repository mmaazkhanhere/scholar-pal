/*an api endpoint to fetch the list of up votes of a given answer */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const answerId = request.nextUrl.pathname.split('/').pop(); //get the answer id

    try {

        if (!answerId) {
            //return nothing if no answer id found
            return null;
        }

        //find the answer and fetch its up votes list
        const upVoteList = await prismadb.answer.findUnique({
            where: {
                id: answerId
            },
            select: {
                upvotes: true
            }
        });

        if (!upVoteList) {
            //return nothing if no vote list found
            return null;
        }

        return NextResponse.json(upVoteList.upvotes) //return the list of up votes

    } catch (error) {

        console.error('GET_UPVOTE_LIST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}