import { Queue } from "bullmq";

export const syncQueue = new Queue("syncQueue", {
  connection: { host: "127.0.0.1", port: 6379 }
});
