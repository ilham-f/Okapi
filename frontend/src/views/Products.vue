<template>
  <v-container>
    <!-- Filter Category -->
    <v-row>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedCategory"
          :items="categoryOptions"
          label="Filter by Category"
          outlined
          dense
        />
      </v-col>
    </v-row>

    <!-- Product List -->
    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="344">
          <v-img :src="product.image" height="200px" />

          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>Rp {{ product.price }}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="primary">Beli</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_CATEGORIES_WITH_PRODUCTS } from "../graphql/queries";

const selectedCategory = ref<string | null>(null);

const { result, loading, error } = useQuery(GET_CATEGORIES_WITH_PRODUCTS);

const categoryOptions = computed(() => {
  return result.value?.categories?.map((c: any) => ({
    text: c.name,
    value: c.id,
  })) ?? [];
});

const filteredProducts = computed(() => {
  if (!result.value?.categories) return [];
  if (!selectedCategory.value) {
    // tampilkan semua produk
    return result.value.categories.flatMap((c: any) => c.products);
  }
  // filter produk berdasarkan kategori
  const category = result.value.categories.find(
    (c: any) => c.id === selectedCategory.value
  );
  return category ? category.products : [];
});
</script>
