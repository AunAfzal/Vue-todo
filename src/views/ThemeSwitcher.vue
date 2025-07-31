<template>
  <div class="theme-switcher">
    <label for="theme-toggle" class="label">
      <span class="label-text">☀️</span>
      <input
        id="theme-toggle"
        type="checkbox"
        :checked="theme === 'dark'"
        @change="toggleTheme"
      />
      <span class="slider"></span>
      <span class="label-text">🌙</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
}

.label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-text {
  font-size: 1.2rem;
  line-height: 1;
}

.theme-switcher input {
  display: none;
}

.slider {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  background-color: #ccc;
  border-radius: 24px;
  transition: background-color 0.3s;
}

.slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

input:checked + .slider {
  background-color: #42b983;
}

input:checked + .slider::before {
  transform: translateX(20px);
}
</style>