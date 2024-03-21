/*An api route that fetches the downvote list for a given answer id */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const answerId = request.nextUrl.pathname.split('/').pop(); /*extract the 
    answer id from the request url */

    try {

        if (!answerId) {
            //if no answerId, return nothing
            return null;
        }

        //get the list of down vote list for a given answer id
        const downVoteList = await prismadb.answer.findUnique({
            where: {
                id: answerId
            },
            select: {
                downvotes: true
            }
        })

        if (!downVoteList) {
            //if no down vote list, return nothing
            return null;
        }

        return NextResponse.json(downVoteList.downvotes)  //return list of down votes

    } catch (error) {

        console.error('GET_DOWNVOTE_LIST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}