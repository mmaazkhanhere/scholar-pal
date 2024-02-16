import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import bcrypt from 'bcryptjs'


export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json(); //extract the json from the request
        const { name, username, email, password } = body //destructure the body data

        console.log(name, username)

        if (!name || !username || !email || !password) {
            //if any detail is missing, an error will be returned
            return new NextResponse('Missing details', { status: 400 })
        }



        //encrypt the user password to store in the database for protection
        const hashedPassword = await bcrypt.hash(password, 12)
        console.log(hashedPassword)

        //Create a new user record in the database using prisma
        const user = await prismadb.user.create({
            data: {
                name,
                username,
                emailAddress: email,
                hashedPassword
            }
        })

        return NextResponse.json(user) //the user data is returned in json format

    } catch (error) {
        console.error(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}