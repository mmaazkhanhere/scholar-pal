/*An api route to fetch all the answers for a give question id that is passed
in the request path */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const questionId = request.nextUrl.pathname.split('/').pop(); /*id of the
    question that is passed in the request url path */

    try {

        if (!questionId) {
            //return nothing if no question id
            return null;
        }

        //get all the answers for a give questionId using prisma query
        const answerList = await prismadb.answer.findMany({
            where: {
                questionId: questionId
            },
            include: {
                author: true,
            }
        })

        return NextResponse.json(answerList) //return the answer list

    } catch (error) {

        console.error('GET_SPECIFIC_QUESTION_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}