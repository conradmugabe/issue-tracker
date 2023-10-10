import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const nextAuthOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
