import nextAuth, { NextAuthOptions, User } from "next-auth";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { Secret } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (req.headers) {
          const res = await fetch(`${req.headers.origin}/api/token`, {
            method: "POST",
            body: JSON.stringify({ name: credentials?.name }),
            headers: { "Content-Type": "application/json" },
          });
          const { token } = await res.json();
          const decoded = jwt.verify(
            token,
            process.env.NEXTAUTH_SECRET as Secret
          ) as any;

          if (credentials && credentials.name === decoded.name) {
            return credentials as unknown as User;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/home",
    signOut: "/",
  },
};

export default nextAuth(authOptions);
