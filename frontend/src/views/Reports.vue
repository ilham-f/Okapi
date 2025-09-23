<template>
    <div>
        <Navbar />
        <h1 class="text-2xl p-4">Reports</h1>
        <ReportTable />
    </div>
</template>

<script setup lang="ts">
    import Navbar from "../components/Navbar.vue";
    import ReportTable from "../components/ReportTable.vue";
</script>