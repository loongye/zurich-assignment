import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// https://next-auth.js.org/configuration/initialization
export const authOptions = {
  providers: [
    // https://next-auth.js.org/providers/google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
  }
}

// if authorization is needed: https://next-auth.js.org/configuration/providers/oauth#authorization-option

export default NextAuth(authOptions)