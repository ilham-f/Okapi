import { MiddlewareFn } from "type-graphql";

export const LoggerMiddleware: MiddlewareFn = async ({ info }, next) => {
  const start = Date.now();
  const result = await next();
  const duration = Date.now() - start;

  console.log(`⚡ ${info.parentType.name}.${info.fieldName} [${duration}ms]`);
  return result;
};
