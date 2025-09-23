import { Worker } from "bullmq";
import { redis } from "../redis/client";

export const stockWorker = new Worker(
  "stock-queue",
  async job => {
    console.log("Processing job:", job.name, job.data);
    // contoh: hitung total keuntungan harian
  },
  { connection: redis }
);
