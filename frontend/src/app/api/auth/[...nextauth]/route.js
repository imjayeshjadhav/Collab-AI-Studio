import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "jwt", // use JWT session strategy
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();

        // Fetch user by email
        const user = await db.collection("users").findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error("No user found with that email");
        }

        // Compare hashed password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return user object as required by NextAuth
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // attach user ID to JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id; // attach user ID to session
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // custom login page
    error: "/login",  // redirect back to login on error
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export const GET = handler;
export const POST = handler;
