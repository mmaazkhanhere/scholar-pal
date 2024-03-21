/*An api route to fetch top 5 questions ordered by amount of answer received */

import { NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const GET = async () => {

    const currentUser = await getCurrentUser(); //get the current user

    try {
        if (!currentUser) {
            //if no current user, return unauthorized error message
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        //find and fetch 5 questions and order by amount of answers
        const questions = await prismadb.question.findMany({
            take: 5, //take 5 questions
            orderBy: { //order the questions by amount of answers
                answers: {
                    _count: 'desc' //question with most answers on top
                }
            },
            select: { //select the questions title and id
                title: true,
                id: true
            }
        })

        return NextResponse.json(questions); //return the list of top questions

    } catch (error) {
        console.error('GET_TOP_QUESTIONS_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}