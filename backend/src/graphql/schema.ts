import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolvers/ProductResolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [ProductResolver],
    validate: false,
  });
