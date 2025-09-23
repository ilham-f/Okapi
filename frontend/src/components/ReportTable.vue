<template>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Total Sold</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="r in reports" :key="r.id">
                <td>{{ r.date }}</td>
                <td>{{ r.product }}</td>
                <td>{{ r.total }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    defineProps({
        reports: Array
    })
</script>
