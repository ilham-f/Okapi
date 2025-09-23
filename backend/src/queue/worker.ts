import { Worker } from "bullmq";

const worker = new Worker("syncQueue", async (job) => {
  if (job.name === "syncToElastic") {
    console.log("🔄 Syncing to ElasticSearch:", job.data);
  }
}, {
  connection: { host: "127.0.0.1", port: 6379 }
});

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});
