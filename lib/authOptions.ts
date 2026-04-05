import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email }).select("+password").lean();

        if (!user || user.password == null) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password as string);

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name || "User",
          email: user.email,
          image: user.image || "",
          type: user.type, 
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register", // If applicable
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectToDatabase();
        if (!user.email) return false;
        
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = await User.create({
            name: user.name || "Unknown User",
            email: user.email,
            image: user.image || "",
            googleId: account.providerAccountId,
            type: "Customer", // default
          });
          (user as any).type = newUser.type; 
          (user as any).id = newUser._id.toString();
        } else {
          (user as any).type = existingUser.type;
          (user as any).id = existingUser._id.toString();
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = (user as any).id;
        token.type = (user as any).type;
        token.accessToken = "mock-access-token-" + Date.now();
        token.refreshToken = "mock-refresh-token-" + Date.now();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).type = token.type as string;
        (session as any).accessToken = token.accessToken;
        (session as any).refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev",
};
