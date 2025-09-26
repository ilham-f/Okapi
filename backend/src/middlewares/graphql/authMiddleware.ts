import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";

interface Context {
  req: any;
  user?: any;
}

export const AuthMiddleware: MiddlewareFn<Context> = async ({ context }, next) => {
  const authHeader = context.req.headers["authorization"];
  if (!authHeader) throw new Error("Unauthorized");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    context.user = decoded;
  } catch {
    throw new Error("Invalid token");
  }

  return next();
};
