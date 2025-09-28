<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Kategori</h1>
    <pre>{{ JSON.stringify(categories, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { result: categories, loading, error } = useQuery(gql`
  query {
    categories {
      id
      name
      children {
        id
        name
        children {
          id
          name
        }
      }
    }
  }
`);
</script>
