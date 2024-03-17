import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const { questionId, answerContent } = body;
    const currentUser = await getCurrentUser();

    try {

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!questionId || !answerContent) {
            return new NextResponse('Missing Data', { status: 400 });
        }

        const answer = await prismadb.answer.create({
            data: {
                questionId: questionId,
                authorId: currentUser.id,
                body: answerContent
            }
        })

        return NextResponse.json(answer);

    } catch (error) {
        console.error('POST_ANSWER_API_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}