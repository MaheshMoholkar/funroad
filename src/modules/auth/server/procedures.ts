import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });

    return session;
  }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, username } = input;

      const existing = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: username,
          },
        },
      });

      if (existing.docs[0])
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken!",
        });

      const user = await ctx.db.create({
        collection: "users",
        data: { email, username, password },
      });
      return user;
    }),
  login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;
    const user = await ctx.db.login({
      collection: "users",
      data: { email, password },
    });

    if (!user.token) throw new TRPCError({ code: "UNAUTHORIZED" });

    const cookies = await getCookies();
    cookies.set({
      name: AUTH_COOKIE,
      value: user.token,
      httpOnly: true,
      path: "/",
      //TODO: ensure cors
    });
    return user;
  }),
});
