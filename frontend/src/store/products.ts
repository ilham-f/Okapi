import type { Module } from "vuex";

export const products: Module<any, any> = {
  namespaced: true,
  state: () => ({
    items: [],
  }),
  mutations: {
    setProducts(state: { items: any; }, products: any) {
      state.items = products;
    },
    updateStock(state: { items: any[]; }, { productId, stock }: any) {
      const p = state.items.find((p: { id: any; }) => p.id === productId);
      if (p) p.stock = stock;
    },
  },
};