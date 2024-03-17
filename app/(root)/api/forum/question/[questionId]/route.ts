import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const questionId = request.nextUrl.pathname.split('/').pop();

    try {

        if (!questionId) {
            return null;
        }

        const question = await prismadb.question.findUnique({
            where: {
                id: questionId
            },
            include: {
                author: true,
                answers: true
            }
        })

        return NextResponse.json(question)

    } catch (error) {

        console.error('GET_SPECIFIC_QUESTION_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}