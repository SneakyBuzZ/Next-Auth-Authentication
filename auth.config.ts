import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/actions/data/user";
import brcyptjs from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const matchedPassword = await brcyptjs.compare(
            password,
            user.password
          );
          if (matchedPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
