<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md w-80">
            <h1 class="text-xl mb-4">Login</h1>
            <input
                v-model="username"
                type="text"
                placeholder="Username"
                class="w-full mb-2 p-2 border rounded"
            />
            <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="w-full mb-4 p-2 border rounded"
            />
            <button class="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { ref } from "vue";

    const store = useStore();
    const router = useRouter();

    const username = ref("");
    const password = ref("");

    const login = async () => {
        if (username.value === "admin" && password.value === "123") {
            store.dispatch("auth/login", {
                user: { name: "Admin" },
                token: "dummy-token",
            });
            router.push("/products");
        } else {
            alert("Login gagal");
        }
    };
</script>
