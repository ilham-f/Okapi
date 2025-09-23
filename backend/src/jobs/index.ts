import { Queue } from "bullmq";
import { redis } from "../redis/client";

export const stockQueue = new Queue("stock-queue", { connection: redis });
