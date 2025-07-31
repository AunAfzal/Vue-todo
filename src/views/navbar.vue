<template>
  <header>
    <nav>
      <div class="links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
      <ThemeSwitcher />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeSwitcher from '../views/ThemeSwitcher.vue'
</script>

<style scoped>
header {
  background-color: #f8f8f8;
  padding: 1rem;
  border-bottom: 1px solid #e7e7e7;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 1rem;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>