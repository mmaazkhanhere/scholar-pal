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

        const question = await prismadb.question.findUnique({
            where: {
                id: questionId,
            },
            select: {
                authorId: true
            }
        })


        const answer = await prismadb.answer.create({
            data: {
                questionId: questionId,
                authorId: currentUser.id,
                body: answerContent
            }
        })

        await prismadb.notification.create({
            data: {
                type: 'NEW_POST',
                senderId: currentUser.id,
                body: `${currentUser.name} has answered your question`,
                userId: question?.authorId as string
            }
        })

        await prismadb.user.update({
            where: {
                id: question?.authorId
            },
            data: {
                hasNotifications: true
            }
        });

        return NextResponse.json(answer);

    } catch (error) {
        console.error('POST_ANSWER_API_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}