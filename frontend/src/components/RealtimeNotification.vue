<template>
    <div v-if="message" class="notif">
        🔔 {{ message }}
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import { io } from "socket.io-client"

    const message = ref(null)
    const socket = io("http://localhost:4000") // backend

    onMounted(() => {
        socket.on("new-transaction", (data) => {
            message.value = `New transaction: ${data.productName} x${data.qty}`
            setTimeout(() => (message.value = null), 5000)
        })
    })
</script>

<style scoped>
    .notif {
        position: fixed;
        top: 10px;
        right: 10px;
        background: #4caf50;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }
</style>
