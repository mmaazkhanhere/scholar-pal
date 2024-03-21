/*an api route to fetch the details of a question using the question id passed
in the request url */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const questionId = request.nextUrl.pathname.split('/').pop(); /*extract
    question id from the request url pathname */

    try {

        if (!questionId) {
            //if no question id, return nothing
            return new NextResponse('Question ID is missing', { status: 400 });
        }

        /*find the question using the prisma query and return all of its relative
        data */
        const question = await prismadb.question.findUnique({
            where: {
                id: questionId
            },
            include: {
                author: true,
                answers: true
            }
        })

        return NextResponse.json(question) //return the question details

    } catch (error) {

        console.error('GET_SPECIFIC_QUESTION_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}