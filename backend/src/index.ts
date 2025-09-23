import "reflect-metadata";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { AppDataSource } from "./config/data-source";
import { createSchema } from "./graphql/schema";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { stockSocket } from "./sockets/stock";
import { stockWorker } from "./jobs/StockWorker";

dotenv.config();

(async () => {
  await AppDataSource.initialize();

  const app = express();
  const httpServer = http.createServer(app);

  // Apollo GraphQL
  const schema = await createSchema();
  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  // Socket.io
  const io = new Server(httpServer, { cors: { origin: "*" } });
  stockSocket(io);

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ${process.env.APP_NAME} running at http://localhost:${PORT}/graphql`);
  });
})();
