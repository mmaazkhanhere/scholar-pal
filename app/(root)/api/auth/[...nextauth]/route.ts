import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing Credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        emailAddress: credentials.email
                    }
                })

                if (!user || !user.hashedPassword) {
                    throw new Error('Missing Credentials')
                }

                const passwordMatched = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!passwordMatched) {
                    throw new Error('Invalid Password')
                }

                return user;
            }
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)