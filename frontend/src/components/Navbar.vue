<template>
    <nav class="navbar">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/transactions">Transactions</router-link>
        <router-link to="/reports">Reports</router-link>
    </nav>
</template>

<script setup>
    //
</script>

<style scoped>
    .navbar {
        display: flex;
        gap: 1rem;
        background: #333;
        padding: 10px;
    }

    a {
        color: white;
        text-decoration: none;
    }
</style>
