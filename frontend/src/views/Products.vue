<template>
    <div>
        <Navbar />
        <h1 class="text-2xl p-4">Products</h1>
        <ProductList :products="products" @buy="buyProduct" />
    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import { useStore } from "vuex";
    import Navbar from "../components/Navbar.vue";
    import ProductList from "../components/ProductList.vue";

    const store = useStore();
    const products = computed(() => store.state.products.items);

    const buyProduct = async (productId: number) => {
        alert("Beli produk ID: " + productId);
    };
</script>