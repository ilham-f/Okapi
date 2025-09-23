<template>
    <form @submit.prevent="submit">
        <input v-model="form.name" placeholder="Product name" />
        <input v-model.number="form.price" placeholder="Price" type="number" />
        <button type="submit">Add Product</button>
    </form>
</template>

<script setup>
    import { ref } from "vue"
    const emit = defineEmits(["submit"])
    const form = ref({ name: "", price: 0 })

    function submit() {
        emit("submit", { ...form.value })
        form.value = { name: "", price: 0 }
    }
</script>
