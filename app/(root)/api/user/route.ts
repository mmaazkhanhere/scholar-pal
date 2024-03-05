/*An API route to get the details of the currently sign in user and also update
the currently sign in user. */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";


export const GET = async (request: NextRequest) => {

    try {

        const userEmail = request.nextUrl.searchParams.get('userEmail')/*
        get the email of the currently sign in user */

        if (!userEmail) {
            //if email doesn't exist, return an unauthorized response
            return new NextResponse('Unauthenticated', { status: 401 })
        }

        //find the current sign in user using the email address provided
        const currentUser = await prismadb.user.findUnique({
            where: {
                emailAddress: userEmail
            },
        })

        if (!currentUser) {
            //if no user found, give 404 status response and an error message
            return new NextResponse('No user', { status: 404 });
        }

        return NextResponse.json(currentUser); //return the current user in json response

    } catch (error) {
        console.error('ERROR_GET_USER', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}

export const PATCH = async (request: NextRequest) => {

    console.log('PATCH')

    const currentUser = await getCurrentUser(); //get the currently signed in user
    const body = await request.json(); //extract the body from the request

    try {

        if (!currentUser) {
            //if no current user, return unauthorized response and error
            return new NextResponse('Not Authenticated', { status: 401 });
        }

        const { name, bio, age, fieldOfStudy, profilePicture, linkedInProfile,
            facebookProfile, twitterProfile, tutoringAvailable } = body;

        //destruct data from the database


        if (!name) {
            //if no name is passed in the body, missing detail error message is returned
            return new NextResponse('Missing details', { status: 400 });
        };

        //update the currently signed in user with the details provided in the body
        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: name,
                bio: bio,
                age: age,
                fieldOfStudy: fieldOfStudy,
                profilePicture: profilePicture,
                linkedInProfile: linkedInProfile,
                facebookProfile: facebookProfile,
                tutoringAvailable: tutoringAvailable
            }
        })

        return NextResponse.json(updatedUser) //return the updated user

    } catch (error) {
        console.error('ERROR_USER_PATCH', { status: 500 })
    }
}