import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { sdk } from "./_core/sdk";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getCredentialByEmail, upsertUser } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    login: publicProcedure
      .input(z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(1, "Password is required"),
      }))
      .mutation(async ({ input, ctx }) => {
        const credential = await getCredentialByEmail(input.email);
        
        if (!credential) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(input.password, credential.passwordHash);
        
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Create a unique openId for credential-based users
        const credentialOpenId = `credential-${input.email}`;

        // Upsert user in database so ctx.user is populated on next request
        await upsertUser({
          openId: credentialOpenId,
          email: input.email,
          name: input.email.split("@")[0],
          loginMethod: "credential",
          lastSignedIn: new Date(),
        });

        // Create a JWT session token
        const sessionToken = await sdk.createSessionToken(credentialOpenId, {
          name: input.email,
        });

        // Set session cookie with JWT token
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { 
          ...cookieOptions, 
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return {
          success: true,
          message: "Login successful",
        };
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
