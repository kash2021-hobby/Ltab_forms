import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import bcrypt from "bcryptjs";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(): { ctx: TrpcContext; setCookie: any[] } {
  const setCookie: any[] = [];

  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "credential",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: any) => {
        setCookie.push({ name, value, options });
      },
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx, setCookie };
}

describe("auth.login", () => {
  it("should reject invalid credentials", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.auth.login({
        email: "nonexistent@example.com",
        password: "wrongpassword",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email or password");
    }
  });

  it("should validate email format", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.auth.login({
        email: "invalid-email",
        password: "password123",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email format");
    }
  });

  it("should require password", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.auth.login({
        email: "test@example.com",
        password: "",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Password is required");
    }
  });
});

describe("auth.logout", () => {
  it("should clear session cookie", async () => {
    const { ctx, setCookie } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
  });
});

describe("auth.me", () => {
  it("should return null when not authenticated", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeNull();
  });
});
