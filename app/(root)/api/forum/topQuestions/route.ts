import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const GET = async () => {

    const currentUser = await getCurrentUser();

    try {
        if (!currentUser) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        const questions = await prismadb.question.findMany({
            take: 5,
            orderBy: {
                answers: {
                    _count: 'desc'
                }
            },
            select: {
                title: true,
                id: true
            }
        })

        return NextResponse.json(questions);

    } catch (error) {
        console.error('GET_TOP_QUESTIONS_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}