import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

// Import views
import Home from "../views/Home.vue"
import Products from "../views/Products.vue"
import Transactions from "../views/Transactions.vue"
import Reports from "../views/Reports.vue"

const routes: Array<RouteRecordRaw> = [
    { path: "/", name: "Home", component: Home },
    { path: "/products", name: "Products", component: Products },
    { path: "/transactions", name: "Transactions", component: Transactions },
    { path: "/reports", name: "Reports", component: Reports }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
