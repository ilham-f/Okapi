import { MiddlewareFn } from "type-graphql";

interface Context {
  user?: { role: string };
}

// Factory middleware → bisa dipakai dengan parameter role
export const RoleMiddleware = (requiredRole: string): MiddlewareFn<Context> => {
  return async ({ context }, next) => {
    if (!context.user) throw new Error("Unauthorized");
    if (context.user.role !== requiredRole) throw new Error("Forbidden");

    return next();
  };
};
