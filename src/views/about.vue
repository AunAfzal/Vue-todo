<template>
  <div class="about">
    <h1>About Us & API Example</h1>
    <p>This page demonstrates how to fetch data from an API in a Vue component.</p>
    <div class="api-content">
      <h2>Example Post from JSONPlaceholder</h2>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error: {{ error }}</div>
      <div v-else-if="post" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const post = ref<Post | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    post.value = await response.json();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 2rem 2rem; /* Adjust for fixed navbar */
}

.api-content {
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid var(--card-border, #ddd);
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  background-color: var(--card-bg, #f9f9f9);
  text-align: left;
}

.loading,
.error {
  font-style: italic;
  color: #888;
}

.error {
  color: #ff4d4d;
}

.post h3 {
  margin-top: 0;
  color: #42b983;
  text-transform: capitalize;
}

.post p {
  margin-bottom: 0;
}
</style>