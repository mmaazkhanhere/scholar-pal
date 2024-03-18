import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const questionId = request.nextUrl.pathname.split('/').pop();

    try {

        if (!questionId) {
            return null;
        }

        const answerList = await prismadb.answer.findMany({
            where: {
                questionId: questionId
            },
            include: {
                author: true,
            }
        })

        return NextResponse.json(answerList)

    } catch (error) {

        console.error('GET_SPECIFIC_QUESTION_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}