import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export interface Todo {
  id: number;
  title: string;
  description: string;
  dateAdded: Date;
  dateCompleted: Date | null;
  completed: boolean;
  deadline: Date;
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);

  // Function to load todos from localStorage
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos, (key, value) => {
        if (key === 'dateAdded' || key === 'dateCompleted' || key === 'deadline') {
          return value ? new Date(value) : null;
        }
        return value;
      });
    } else {
      // Default data if nothing is in localStorage
      todos.value = [
        {
          id: 1,
          title: 'Learn Vue.js',
          description: 'Complete the Vue.js documentation.',
          dateAdded: new Date(),
          dateCompleted: null,
          completed: false,
          deadline: new Date(new Date().setDate(new Date().getDate() + 2)),
        },
        {
          id: 2,
          title: 'Build a To-Do App',
          description: 'Create a feature-rich to-do application.',
          dateAdded: new Date(new Date().setDate(new Date().getDate() - 1)),
          dateCompleted: new Date(),
          completed: true,
          deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
        },
      ];
    }
  };

  // Watch for changes and save them automatically to localStorage
  watch(
    todos,
    () => {
      localStorage.setItem('todos', JSON.stringify(todos.value));
    },
    { deep: true }
  );

  // Load todos when the composable is first used
  loadTodos();

  const addTodo = (newTodoData: Omit<Todo, 'id' | 'dateAdded' | 'dateCompleted' | 'completed'>) => {
    const newTodo: Todo = {
      ...newTodoData,
      id: Date.now(), // Simple unique ID
      dateAdded: new Date(),
      dateCompleted: null,
      completed: false,
    };
    todos.value.push(newTodo);
  };

  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const toggleComplete = (id: number) => {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.dateCompleted = todo.completed ? new Date() : null;
    }
  };
  return { todos, addTodo, deleteTodo, toggleComplete };
});