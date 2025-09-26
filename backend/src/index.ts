import "reflect-metadata";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { errorHandler } from "./middlewares/express/errorHandler";
import { loggerMiddleware } from "./middlewares/express/logger";
import { createContext } from "./context";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = express();

  // Express middleware global
  app.use(loggerMiddleware);
  app.use(express.json());

  // Apollo GraphQL
  const schema = await buildSchema({
    resolvers: [UserResolver],
    globalMiddlewares: [], // bisa taruh LoggerMiddleware GraphQL global
  });

  const server = new ApolloServer({
    schema,
    context: createContext,
  });

  await server.start();
  server.applyMiddleware({ app: app as Application, path: "/graphql" });

  // Error handler terakhir
  app.use(errorHandler);

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => console.log(`🚀 Server ${process.env.APP_NAME} running at http://localhost:${PORT}/graphql`));
}

bootstrap();

