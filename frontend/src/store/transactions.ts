import type { Module } from "vuex";

export const transactions: Module<any, any> = {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  mutations: {
    setTransactions(state: { list: any; }, txs: any) {
      state.list = txs;
    },
    addTransaction(state: { list: any[]; }, tx: any) {
      state.list.push(tx);
    },
  },
};