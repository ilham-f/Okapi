<template>
  <v-app>
    <v-app-bar app color="#e1ecc8" dark>
      <img src="/src/assets/logo.png" alt="logo" style="width: 40px; margin-left: 20px;">
      <v-app-bar-title>
        Okapi
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
