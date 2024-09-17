import User from "@/models/User";
import connect from "@/utils/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          const user = await User.findOne({ name: credentials.name });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              // Return user object with admin status
              return {
                id: user._id,
                name: user.name,
                admin: user.admin, // Include admin attribute
              };
            } else {
              throw new Error("Wrong credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          throw new Error(err.message);
        }
      }
    })
  ],
  pages: {
    error: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      // Add the admin status to the session
      if (token && token.admin !== undefined) {
        session.user.admin = token.admin;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add the admin status to the token for persistence
      if (user) {
        token.admin = user.admin;
      }
      return token;
    }
  }
});

export { handler as GET, handler as POST };
