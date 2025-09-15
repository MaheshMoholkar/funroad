import { headers as getHeaders } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });

    return session;
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

      const tenant = await ctx.db.create({
        collection: "tenants",
        data: {
          name: input.username,
          slug: input.username,
          paymentId: "test",
          upi_id: "test",
        },
      });

      await ctx.db.create({
        collection: "users",
        data: {
          email,
          username,
          password,
          tenants: [
            {
              tenant: tenant.id,
            },
          ],
        },
      });

      const user = await ctx.db.login({
        collection: "users",
        data: {
          email,
          password,
        },
      });

      if (!user.token) throw new TRPCError({ code: "UNAUTHORIZED" });

      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,
        value: user.token,
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

    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: user.token,
    });

    return user;
  }),
});
