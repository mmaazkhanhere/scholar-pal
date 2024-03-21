/*An api route to give an upvote to an answer and update the answer author score */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (request: NextRequest) => {

    const body = await request.json(); //get the body from the request
    const { answerId } = body; //extract answer id from the body
    const currentUser = await getCurrentUser(); //get the current user

    try {

        if (!currentUser) {
            //if no current user, return an unauthenticated error message
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!answerId) {
            //if no answer id, return a missing detail error message
            return new NextResponse('Missing details', { status: 400 });
        }

        //find the answer in the database using Prisma query
        const answer = await prismadb.answer.findUnique({
            where: {
                id: answerId
            },
            select: {
                upvotes: true,
                authorId: true
            }
        })

        //find the answer author
        const author = await prismadb.user.findUnique({
            where: {
                id: answer?.authorId
            },
            select: {
                score: true
            }
        })

        const authorScore = author?.score //get the author's score
        const authorUpdatedScore = authorScore! + 10; //add the author's score


        if (!answer) {
            return new NextResponse('Cannot find answer', { status: 400 });
        }

        let updatedList = answer.upvotes;

        if (updatedList.includes(currentUser.id)) {

            //if user already has given vote, it is removed from the list
            updatedList = updatedList.filter((userId) => userId !== currentUser.id);

            //the answer author score is reset
            await prismadb.user.update({
                where: {
                    id: answer.authorId
                },
                data: {
                    score: authorScore
                }
            });
        }
        else {

            //if the user is not in the list, they are added to the list
            updatedList.push(currentUser.id);

            //a notification is created notifying the answer author of the vote
            await prismadb.notification.create({
                data: {
                    userId: answer.authorId,
                    senderId: currentUser.id,
                    body: `${currentUser.name} has upvoted your answer`,
                    type: 'UPVOTE'
                }
            })

            //update the answer author notification status and score
            await prismadb.user.update({
                where: {
                    id: answer.authorId
                },
                data: {
                    score: authorUpdatedScore,
                    hasNotifications: true
                }
            });

        }

        //update the question up vote list
        const updatedUpVoteList = await prismadb.answer.update({
            where: {
                id: answerId
            },
            data: {
                upvotes: updatedList
            }
        });

        return NextResponse.json(updatedUpVoteList); //return the upvoted list

    } catch (error) {
        console.error('THUMBUP_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};