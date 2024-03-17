import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {
    try {
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

        return NextResponse.json(questions);
    } catch (error) {
        console.error('GET_ALL_QUESTIONS_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}



export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const { userId, content, title } = body;

    try {

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 })
        }

        if (!content || !title) {
            return new NextResponse('Missing Content', { status: 400 })
        }

        const question = await prismadb.question.create({
            data: {
                title: title,
                authorId: userId,
                body: content
            }
        });

        return NextResponse.json(question);

    } catch (error) {
        console.error('QUESTION_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}