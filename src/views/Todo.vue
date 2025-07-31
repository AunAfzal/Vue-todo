<template>
  <li class="todo-item">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle-complete', todo.id)"
      />
      <div class="todo-details">
        <h3 :class="{ completed: todo.completed }">{{ todo.title }}</h3>
        <p>{{ todo.description }}</p>
        <div class="meta">
          <span>Added: {{ formatDate(todo.dateAdded) }}</span>
          <span v-if="todo.completed"> | Completed: {{ formatDate(todo.dateCompleted) }}</span>
          <span> | Deadline: {{ formatDate(todo.deadline) }}</span>
        </div>
      </div>
    </div>
    <div class="todo-actions">
      <RouterLink :to="`/addtodo/${todo.id}`" class="edit-btn">Edit</RouterLink>
      <button @click="$emit('delete-todo', todo.id)" class="delete-btn">×</button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface Todo {
  id: number;
  title: string;
  description: string;
  dateAdded: Date;
  dateCompleted: Date | null;
  completed: boolean;
  deadline: Date;
}

defineProps<{
  todo: Todo;
}>();

defineEmits(['toggle-complete', 'delete-todo']);

const formatDate = (date: Date | null) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style-type: none;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.todo-details h3 {
  margin: 0;
}

.todo-details h3.completed {
  text-decoration: line-through;
  color: #888;
}

.todo-details p {
  margin: 0.5rem 0 0;
  color: #555;
}

.meta {
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.5rem;
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-btn {
  background-color: #f0ad4e;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  border: none;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
