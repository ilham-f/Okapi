import { syncQueue } from "../queue";

export const addProduct = async (productData: any) => {
  await syncQueue.add("syncToElastic", productData);
};
