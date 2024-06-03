import { User } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            emailVerified?: boolean
            role: string
            image: string
        } & DefaultSession['user']
    }
}


// export type UserWithSession = User & { session: DefaultSession['user'] }