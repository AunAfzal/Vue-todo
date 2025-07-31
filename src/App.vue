<script setup lang="ts">
import { RouterView } from 'vue-router'
import navbar from './views/navbar.vue';
</script>

<template>
  <div>
    <navbar/>
    <RouterView />
  </div>
</template>

<style>
:root {
  --background-color: #ffffff;
  --text-color: #2c3e50;
  --header-bg: #f8f8f8;
  --header-border: #e7e7e7;
  --card-bg: #f9f9f9;
  --card-border: #ddd;
}

[data-theme="dark"] {
  --background-color: #121212;
  --text-color: #e9e9e9;
  --header-bg: #1e1e1e;
  --header-border: #2d2d2d;
  --card-bg: #1e1e1e;
  --card-border: #2d2d2d;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

header {
  background-color: var(--header-bg) !important;
  border-bottom-color: var(--header-border) !important;
  transition: background-color 0.3s, border-bottom-color 0.3s;
}

header nav a {
  color: var(--text-color) !important;
}

.todo-item {
  background-color: var(--card-bg) !important;
  border-color: var(--card-border) !important;
}
</style>
