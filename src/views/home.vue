<template>
  <main class="home-view">
    <div class="header">
      <h1>My To-Do List</h1>
      <div class="filter-bar">
        <label for="filter">Filter by: </label>
        <select id="filter" v-model="filter">
          <option value="all">All</option>
          <option value="today">Expected Completion Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="deadline-reached">Deadline Reached</option>
        </select>
      </div>
    </div>

    <ul class="todo-list">
      <Todo
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle-complete="toggleComplete"
        @delete-todo="deleteTodo"
      />
    </ul>

    <div class="actions">
      <button @click="hideCompleted = !hideCompleted">
        {{ hideCompleted ? 'Show' : 'Hide' }} Completed
      </button>
      <RouterLink to="/addtodo" class="add-todo-btn" role="button">
        Add Todo
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router' // RouterLink is used in the template
import Todo from './Todo.vue'
import { useTodos } from '../composables/useTodos'

const { todos, toggleComplete, deleteTodo } = useTodos()

const hideCompleted = ref(false);
const filter = ref('all');

const filteredTodos = computed(() => {
  let list = todos.value;

  if (hideCompleted.value) {
    list = list.filter((todo) => !todo.completed);
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filter.value) {
    case 'today':
      return list.filter((todo) => {
        const deadline = new Date(todo.deadline);
        return (
          deadline.getFullYear() === today.getFullYear() &&
          deadline.getMonth() === today.getMonth() &&
          deadline.getDate() === today.getDate()
        );
      });
    case 'week':
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return list.filter((todo) => {
        const deadline = new Date(todo.deadline);
        return deadline >= today && deadline < nextWeek;
      });
    case 'month':
      return list.filter((todo) => {
        const deadline = new Date(todo.deadline);
        return deadline.getMonth() === today.getMonth() && deadline.getFullYear() === today.getFullYear();
      });
    case 'deadline-reached':
      return list.filter((todo) => !todo.completed && new Date(todo.deadline) < now);
    default:
      // 'all'
      return list;
  }
});
</script>

<style scoped>
.home-view {
  padding: 80px 2rem 2rem; /* Add padding for fixed navbar */
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.todo-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.add-todo-btn {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}
</style>