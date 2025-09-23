<template>
    <div>
        <h2>Product List</h2>
        <ul>
            <li v-for="p in products" :key="p.id">
                {{ p.name }} - {{ p.price }}
            </li>
        </ul>
    </div>
</template>

<script setup>
    defineProps({
    products: {
        type: Array,
        required: true
    }
    })
</script>
