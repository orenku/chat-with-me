import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : ""
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google" && profile?.email === process.env.ADMIN_EMAIL)
                return true

            return false
        }
    }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
