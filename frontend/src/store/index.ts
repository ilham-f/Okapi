import { createStore } from "vuex";
import auth from "./auth";
import { products } from "./products";
import { transactions } from "./transactions";
import { reports } from "./reports";

const store = createStore({
  modules: {
    auth,
    products,
    transactions,
    reports,
  },
});

export default store;