import type { Module } from "vuex";

export const reports: Module<any, any> = {
  namespaced: true,
  state: () => ({
    data: [],
  }),
  mutations: {
    setReports(state: { data: any; }, reports: any) {
      state.data = reports;
    },
  },
};