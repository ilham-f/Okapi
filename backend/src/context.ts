import { Request } from "express";

export interface MyContext {
  req: Request;
  user?: any;
}

export const createContext = ({ req }: { req: Request }): MyContext => {
  return { req };
};
