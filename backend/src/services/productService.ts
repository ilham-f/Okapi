import { syncQueue } from "../queue";

export const addProduct = async (productData: any) => {
  // simpan ke MySQL via TypeORM
  // ...
  
  // tambahkan ke queue
  await syncQueue.add("syncToElastic", productData);
};
