import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// https://next-auth.js.org/configuration/initialization
export const authOptions = {
  providers: [
    // https://next-auth.js.org/providers/google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return profile
      },
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  }
}

// if authorization is needed: https://next-auth.js.org/configuration/providers/oauth#authorization-option

export default NextAuth(authOptions)