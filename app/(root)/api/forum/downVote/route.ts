/*An api route that handles POST requests to downvote answers given a answerId
passed in the request body. */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (request: NextRequest) => {

    const body = await request.json(); //get the body from the request
    const { answerId } = body; //extract answerId from the body
    const currentUser = await getCurrentUser(); //get the current user

    try {

        if (!currentUser) {
            //if no current user, return an unauthenticated error message
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!answerId) {
            //if no answerId, return a missing detail error message
            return new NextResponse('Missing details', { status: 400 });
        }

        /*find the answer and select the downvotes and author id from it
        using prisma query */
        const answer = await prismadb.answer.findUnique({
            where: {
                id: answerId
            },
            select: {
                downvotes: true,
                authorId: true
            }
        })

        /*find the author given an author id */
        const author = await prismadb.user.findUnique({
            where: {
                id: answer?.authorId
            },
            select: {
                score: true
            }
        })

        const authorScore = author?.score //get the answer author score

        const authorUpdatedScore = authorScore! - 5; //deduct 5 points from the score

        if (!answer) {
            return new NextResponse('Cannot find answer', { status: 400 });
        }

        let updatedList = answer.downvotes; //get the list of answer down votes

        if (updatedList.includes(currentUser.id)) {

            /*If user exists in the downvote list, remove it and reassign the user score */
            updatedList = updatedList.filter((userId) => userId !== currentUser.id);

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

            //if the current user is not in the list, add them to the list
            updatedList.push(currentUser.id);

            //create a notification to the question author notifying about the downvote
            await prismadb.notification.create({
                data: {
                    userId: answer.authorId,
                    senderId: currentUser.id,
                    body: `${currentUser.name} has downvoted your answer`,
                    type: 'DOWNVOTE'
                }
            })

            //update the user score and its notification status
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

        const updateDownVoteList = await prismadb.answer.update({
            where: {
                id: answerId
            },
            data: {
                downvotes: updatedList
            }
        });

        return NextResponse.json(updateDownVoteList); //return the downvote list

    } catch (error) {
        console.error('DOWN_VOTE_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};