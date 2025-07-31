<template>
  <div class="add-todo-view">
    <h1>{{ isEditMode ? 'Edit To-Do' : 'Add a New To-Do' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="deadline">Deadline</label>
        <input type="date" id="deadline" v-model="deadline" required />
      </div>
      <div class="form-actions">
        <RouterLink to="/" class="btn-secondary">Cancel</RouterLink>
        <button type="submit" class="btn-primary">{{ isEditMode ? 'Update To-Do' : 'Add To-Do' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useTodos } from '../composables/useTodos'

const title = ref('')
const description = ref('')
const deadline = ref('')
const todoId = ref<number | null>(null)

const router = useRouter()
const route = useRoute()
const { addTodo, getTodoById, updateTodo } = useTodos()

const isEditMode = computed(() => !!route.params.id)

onMounted(() => {
  if (route.params.id) {
    const id = Number(route.params.id)
    todoId.value = id
    const existingTodo = getTodoById(id)
    if (existingTodo) {
      title.value = existingTodo.title
      description.value = existingTodo.description
      // Format the date for the input[type=date] which expects 'YYYY-MM-DD'
      deadline.value = existingTodo.deadline.toISOString().split('T')[0]
    }
  }
})

const handleSubmit = () => {
  if (title.value && description.value && deadline.value) {
    const todoData = {
      title: title.value,
      description: description.value,
      deadline: new Date(`${deadline.value}T23:59:59`) // Set to end of day
    }
    if (isEditMode.value && todoId.value !== null) {
      updateTodo(todoId.value, todoData)
    } else {
      addTodo(todoData)
    }
    router.push('/')
  }
}
</script>

<style scoped>
.add-todo-view {
  padding: 80px 2rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  text-align: center;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}
</style>
