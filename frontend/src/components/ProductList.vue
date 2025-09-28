<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Daftar Produk</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul>
      <li v-for="p in products" :key="p.id" class="p-2 border-b">
        {{ p.name }} ({{ p.category?.name }}) - Stock: {{ p.stock }} - Rp{{ p.price }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { result, loading, error } = useQuery(gql`
  query {
    products {
      id
      name
      stock
      price
      category {
        id
        name
      }
    }
  }
`);

const products = result;
</script>
