/*An api endpoint for fetching all questions and creating new question for the
forum section */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async () => {

    try {

        //get all the questions using the prisma query
        const questions = await prismadb.question.findMany({
            include: {
                answers: true,
                author: {
                    select: {
                        name: true,
                        profilePicture: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(questions); //return the list of questions
    } catch (error) {
        console.error('GET_ALL_QUESTIONS_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}



export const POST = async (request: NextRequest) => {

    const body = await request.json(); //get the body of request
    const { userId, content, title } = body; //extract data from body

    try {

        if (!userId) {

            //if no user id, return unauthorized response and error message
            return new NextResponse('Unauthenticated', { status: 401 })
        }

        if (!content || !title) {

            //if no content or title, return missing details and error message
            return new NextResponse('Missing Content', { status: 400 })
        }

        //create a new question using prisma query and relative data
        const question = await prismadb.question.create({
            data: {
                title: title,
                authorId: userId,
                body: content
            }
        });

        return NextResponse.json(question); //return the question

    } catch (error) {
        console.error('QUESTION_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}