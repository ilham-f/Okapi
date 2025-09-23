<template>
    <div>
        <h2>Transactions</h2>
        <ul>
            <li v-for="t in transactions" :key="t.id">
                {{ t.productName }} - {{ t.qty }} pcs
            </li>
        </ul>
    </div>
</template>

<script setup>
    defineProps({
        transactions: Array
    })
</script>
