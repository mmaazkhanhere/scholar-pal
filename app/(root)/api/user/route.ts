import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";


export const GET = async (request: NextRequest) => {

    try {

        const userEmail = request.nextUrl.searchParams.get('userEmail')

        if (!userEmail) {
            return new NextResponse('No user email', { status: 404 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                emailAddress: userEmail
            },
        })

        if (!currentUser) {
            return new NextResponse('No user', { status: 404 });
        }

        return NextResponse.json(currentUser);

    } catch (error) {
        console.error('ERROR_GET_USER', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}

export const PATCH = async (request: NextRequest) => {

    try {

        const currentUser = await getCurrentUser();
        const body = await request.json();

        if (!currentUser) {
            return new NextResponse('Not Authenticated', { status: 401 });
        }

        const { name, bio, age, fieldOfStudy, profilePicture, linkedInProfile,
            facebookProfile, twitterProfile, tutoringAvailable } = body;


        if (!name) {
            return new NextResponse('Missing details', { status: 400 });
        };

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

        return NextResponse.json(updatedUser)

    } catch (error) {
        console.error('ERROR_USER_PATCH', { status: 500 })
    }
}