<template>
  <v-container>
    <v-treeview
      :items="categoryTree"
      selectable         select-strategy="independent" open-on-click
      item-value="id"
      item-title="name"
      item-children="children"
      v-model:selected="selectedCategories" />

    <v-card class="mt-4 pa-3" outlined>
      <h4>Debug State</h4>
      <p><strong>Selected Categories:</strong> {{ selectedCategories }}</p>
      <p><strong>Filtered Products Count:</strong> {{ filteredProducts.length }}</p>
    </v-card>
    
    <v-row class="mt-4">
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>Rp {{ product.price }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
// Asumsikan GET_CATEGORIES_WITH_PRODUCTS sudah diimpor dengan benar
import { GET_CATEGORIES_WITH_PRODUCTS } from "../graphql/queries"; 

// state
// selectedCategories akan menyimpan array ID kategori yang DICENTANG
const selectedCategories = ref<number[]>([]);

const { result, loading, error } = useQuery(GET_CATEGORIES_WITH_PRODUCTS);

// computed: category tree
const categoryTree = computed(() => result.value?.categories ?? []);

// Fungsi bantu untuk mencari kategori berdasarkan ID (Diperlukan oleh filteredProducts)
const findCategory = (nodes: any[], id: number): any => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findCategory(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Fungsi Rekursif untuk Mengumpulkan Produk dari Kategori dan Semua Anak-Anaknya
const getProductsFromNodeAndChildren = (node: any, productList: any[]) => {
    // 1. Tambahkan produk dari node (kategori) saat ini
    if (node.products && node.products.length > 0) {
        productList.push(...node.products);
    }
    
    // 2. Lanjutkan secara rekursif ke anak-anak
    if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => {
            getProductsFromNodeAndChildren(child, productList);
        });
    }
};

// Fungsi Rekursif untuk Mengumpulkan SEMUA Produk dari seluruh pohon kategori
const collectAllProductsRecursively = (nodes: any[], productList: any[]) => {
    if (!nodes) return;

    for (const node of nodes) {
        // 1. Tambahkan produk dari node (kategori) saat ini
        if (node.products && node.products.length > 0) {
            productList.push(...node.products);
        }
        
        // 2. Lanjutkan secara rekursif ke anak-anak
        if (node.children && node.children.length > 0) {
            collectAllProductsRecursively(node.children, productList);
        }
    }
};

// computed: filtered products
const filteredProducts = computed(() => {
  console.log("Recompute filteredProducts → selected:", selectedCategories.value);

  // LOGIKA BARU UNTUK MENAMPILKAN SEMUA PRODUK KETIKA TIDAK ADA YANG DIPILIH
  if (!selectedCategories.value.length) {
    const allProducts: any[] = [];
    collectAllProductsRecursively(categoryTree.value, allProducts);
    
    // Hapus duplikat dari semua produk sebelum dikembalikan
    const uniqueAll = new Map(allProducts.map((p) => [p.id, p]));
    return Array.from(uniqueAll.values());
  }

  // --- LOGIKA FILTER (TETAP SAMA SEPERTI SEBELUMNYA) ---
  const products: any[] = [];
  
  for (const id of selectedCategories.value) {
    const category = findCategory(categoryTree.value, id);
    
    if (category) {
        // Fungsi ini sudah ada di jawaban sebelumnya untuk mengumpulkan produk rekursif
        getProductsFromNodeAndChildren(category, products); 
    }
  }

  // hapus duplikat
  const unique = new Map(products.map((p) => [p.id, p]));
  return Array.from(unique.values());
});

// watchers untuk debug
watch(selectedCategories, (val) => {
  console.log("WATCH → selectedCategories:", val);
});

watch(result, (val) => {
  console.log("WATCH → GraphQL result:", val);
});

watch(filteredProducts, (val) => {
  console.log("WATCH → filteredProducts:", val.length, "items.");
});

// log saat komponen pertama kali mount
onMounted(() => {
  console.log("Komponen mount → initial categoryTree:", categoryTree.value);
});
</script>