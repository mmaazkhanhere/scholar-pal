/*An api route to create news  answers to a question*/

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (request: NextRequest) => {

    const body = await request.json(); //get the body of the request
    const { questionId, answerContent } = body; //extract data from the body
    const currentUser = await getCurrentUser(); //get the current user

    try {

        if (!currentUser) {
            //if no current user, send an unauthorized error message
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!questionId || !answerContent) {
            //if missing question id or answer content, send a missing detail error message
            return new NextResponse('Missing Data', { status: 400 });
        }

        /*find the specific question using the prisma query */
        const question = await prismadb.question.findUnique({
            where: {
                id: questionId,
            },
            select: {
                authorId: true
            }
        })


        /*Create an answer for the give question */
        const answer = await prismadb.answer.create({
            data: {
                questionId: questionId,
                authorId: currentUser.id,
                body: answerContent
            }
        })

        //create a new notification to the question author notifying about the answer
        await prismadb.notification.create({
            data: {
                type: 'NEW_POST',
                senderId: currentUser.id,
                body: `${currentUser.name} has answered your question`,
                userId: question?.authorId as string
            }
        })

        //update the author user notification status
        await prismadb.user.update({
            where: {
                id: question?.authorId
            },
            data: {
                hasNotifications: true
            }
        });

        return NextResponse.json(answer); //return the answer

    } catch (error) {
        console.error('POST_ANSWER_API_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}